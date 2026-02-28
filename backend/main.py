from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from PIL import Image
import numpy as np
import joblib
from cure_dict import cure_dict

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- LOAD TFLITE MODEL ----------------
interpreter = tf.lite.Interpreter(
    model_path="model1/smart_agri_model_quant.tflite"
)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

class_names = [
    "Healthy",
    "Tomato Late Blight",
    "Tomato Early Blight"
]

# ---------------- LOAD RISK MODEL ----------------
risk_model = joblib.load("model2/disease_risk_model.pkl")
crop_encoder = joblib.load("model2/crop_encoder.pkl")
disease_encoder = joblib.load("model2/disease_encoder.pkl")

@app.get("/")
def home():
    return {"message": "AI Smart Agriculture API Running"}

# ---------------- DISEASE PREDICTION ----------------
@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):

    try:
        image = Image.open(file.file).convert("RGB")
        image = image.resize((224, 224))
        image = np.array(image).astype(np.float32) / 255.0
        image = np.expand_dims(image, axis=0)

        interpreter.set_tensor(input_details[0]['index'], image)
        interpreter.invoke()

        prediction = interpreter.get_tensor(output_details[0]['index'])[0]

        class_index = int(np.argmax(prediction))
        confidence = float(prediction[class_index]) * 100
        disease_name = class_names[class_index]

        cure = cure_dict.get(disease_name, {})

        return {
            "disease": disease_name,
            "confidence_percentage": round(confidence, 2),
            "severity_percentage": round(confidence, 2),
            "organic_cure": cure.get("organic", "No data"),
            "chemical_cure": cure.get("chemical", "No data"),
            "ai_explanation": f"The plant shows symptoms of {disease_name}. Immediate treatment recommended.",
            "yield_prediction": "Estimated yield may reduce by 20% if untreated."
        }

    except Exception as e:
        return {"error": str(e)}

# ---------------- RISK PREDICTION ----------------
@app.post("/predict_risk/")
def predict_risk(
    crop: str = Form(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    rainfall: float = Form(...)
):

    try:
        crop_encoded = crop_encoder.transform([crop])[0]
        features = np.array([[temperature, humidity, rainfall, crop_encoded]])
        probabilities = risk_model.predict_proba(features)[0]

        max_index = int(np.argmax(probabilities))
        risk_percentage = float(probabilities[max_index]) * 100
        disease_name = disease_encoder.inverse_transform([max_index])[0]

        return {
            "crop": crop,
            "predicted_disease": disease_name,
            "risk_percentage": round(risk_percentage, 2),
            "message": f"{crop} has {round(risk_percentage,2)}% risk of {disease_name} in next 5 days."
        }

    except Exception as e:
        return {"error": str(e)}
