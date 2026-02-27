from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import tensorflow as tf
import joblib
import requests
from cure_dict import cure_dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model 1 (.tflite)
interpreter = tf.lite.Interpreter(model_path="model1/smart_agri_model_quant.tflite")
interpreter.allocate_tensors()

# Load Model 2 (.pkl)
risk_model = joblib.load("model2/disease_risk_model.pkl")
crop_encoder = joblib.load("model2/crop_encoder.pkl")
disease_encoder = joblib.load("model2/disease_encoder.pkl")

# ---------------------------
# 1️⃣ IMAGE PREDICTION API
# ---------------------------

@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):
    image = Image.open(file.file).resize((224,224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0).astype(np.float32)

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], image)
    interpreter.invoke()

    prediction = interpreter.get_tensor(output_details[0]['index'])
    confidence = float(np.max(prediction)) * 100
    class_index = np.argmax(prediction)

    # Replace with your actual class list
    classes = ["Healthy", "Tomato Late Blight"]
    disease_name = classes[class_index]

    cure = cure_dict.get(disease_name, {})

    return {
        "disease": disease_name,
        "confidence": round(confidence,2),
        "severity": round(confidence,2),
        "organic_cure": cure.get("organic"),
        "chemical_cure": cure.get("chemical")
    }



@app.post("/predict_risk/")
def predict_risk(crop: str, temperature: float, humidity: float, rainfall: float):

    crop_encoded = crop_encoder.transform([crop])[0]

    features = np.array([[temperature, humidity, rainfall, crop_encoded]])

    risk = risk_model.predict_proba(features)[0]
    risk_percent = round(max(risk)*100,2)

    disease_index = np.argmax(risk)
    disease_name = disease_encoder.inverse_transform([disease_index])[0]

    return {
        "crop": crop,
        "predicted_disease": disease_name,
        "risk_percentage": risk_percent,
        "message": f"{crop} – {risk_percent}% risk of {disease_name} in next 5 days"
    }
