from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import os
from cure_dict import cure_dict

# ===============================
# CREATE APP
# ===============================
app = FastAPI()

# ===============================
# ENABLE CORS
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# LOAD MODELS SAFELY
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Risk Model
risk_model = pickle.load(open(os.path.join(BASE_DIR, "model2", "disease_risk_model.pkl"), "rb"))
crop_encoder = pickle.load(open(os.path.join(BASE_DIR, "model2", "crop_encoder.pkl"), "rb"))
disease_encoder = pickle.load(open(os.path.join(BASE_DIR, "model2", "disease_encoder.pkl"), "rb"))

# TFLite Disease Model
interpreter = tf.lite.Interpreter(
    model_path=os.path.join(BASE_DIR, "model1", "smart_agri_model_quant.tflite")
)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# ===============================
# ROOT ROUTE
# ===============================
@app.get("/")
def home():
    return {"message": "API Running Successfully"}

# ===============================
# DISEASE DETECTION (IMAGE)
# ===============================
@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((224, 224))

        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        interpreter.set_tensor(input_details[0]["index"], img_array)
        interpreter.invoke()

        output = interpreter.get_tensor(output_details[0]["index"])[0]

        confidence = float(np.max(output))
        predicted_class = int(np.argmax(output))
        severity_percentage = int(confidence * 100)

        disease_classes = list(cure_dict.keys())

        if predicted_class >= len(disease_classes):
            return {"error": "Model class mismatch"}

        disease_name = disease_classes[predicted_class]

        return {
            "disease": disease_name,
            "confidence_percentage": round(confidence * 100, 2),
            "severity_percentage": severity_percentage,
            "ai_explanation": f"{disease_name} detected with {severity_percentage}% severity."
        }

    except Exception as e:
        return {"error": str(e)}

# ===============================
# RISK PREDICTION
# ===============================
@app.post("/predict_risk/")
def predict_risk(
    crop: str = Form(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    rainfall: float = Form(...)
):
    try:
        crop = crop.lower()

        if crop not in crop_encoder.classes_:
            return {"error": f"{crop} not supported"}

        crop_encoded = crop_encoder.transform([crop])[0]

        # IMPORTANT: correct feature order
        features = np.array([[crop_encoded, temperature, humidity, rainfall]])

        probabilities = risk_model.predict_proba(features)[0]

        risk_percentage = int(max(probabilities) * 100)

        predicted_disease = disease_encoder.inverse_transform(
            [np.argmax(probabilities)]
        )[0]

        return {
            "risk_percentage": risk_percentage,
            "predicted_disease": predicted_disease,
            "message": f"{crop.capitalize()} – {risk_percentage}% risk of {predicted_disease} in next 5 days"
        }

    except Exception as e:
        return {"error": str(e)}

# ===============================
# LOCAL RUN
# ===============================
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)
