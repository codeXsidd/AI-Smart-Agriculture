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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# LOAD RISK MODEL
# =========================
risk_model = pickle.load(open(os.path.join(BASE_DIR, "model2", "disease_risk_model.pkl"), "rb"))

crop_encoder = pickle.load(
    open(os.path.join(BASE_DIR, "model2", "crop_encoder.pkl"), "rb")
)

disease_encoder = pickle.load(
    open(os.path.join(BASE_DIR, "model2", "disease_encoder.pkl"), "rb")
)

# =========================
# LOAD TFLITE MODEL
# =========================
interpreter = tf.lite.Interpreter(
    model_path=os.path.join(BASE_DIR, "model1", "smart_agri_model_quant.tflite")
)

interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# =========================
# ROOT
# =========================
@app.get("/")
def home():
    return {"message": "AI Smart Agriculture API Running"}

# =========================
# AFTER INFECTION (FIXED)
# =========================
@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((224, 224))

        image = np.array(image, dtype=np.float32) / 255.0
        image = np.expand_dims(image, axis=0)

        interpreter.set_tensor(input_details[0]["index"], image)
        interpreter.invoke()

        output = interpreter.get_tensor(output_details[0]["index"])[0]

        confidence = float(np.max(output))
        predicted_index = int(np.argmax(output))

        # SAFE MAPPING
        disease_names = list(cure_dict.keys())

        disease = disease_names[predicted_index % len(disease_names)]

        severity_percentage = int(confidence * 100)

        return {
            "disease": disease,
            "confidence_percentage": round(confidence * 100, 2),
            "severity_percentage": severity_percentage,
            "organic_cure": cure_dict[disease]["organic"],
            "chemical_cure": cure_dict[disease]["chemical"],
            "ai_explanation": f"{disease} detected with {severity_percentage}% confidence."
        }

    except Exception as e:
        return {"error": str(e)}

# =========================
# BEFORE INFECTION (FIXED)
# =========================
@app.post("/predict_risk/")
def predict_risk(
    crop: str = Form(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    rainfall: float = Form(...)
):
    try:
        crop = crop.strip()

        # Get allowed crops from encoder
        allowed_crops = crop_encoder.classes_.tolist()

        # Auto-fix capitalization
        match = None
        for c in allowed_crops:
            if c.lower() == crop.lower():
                match = c
                break

        if match is None:
            return {
                "error": f"{crop} not supported. Allowed crops: {allowed_crops}"
            }

        crop_encoded = crop_encoder.transform([match])[0]
        
        features = np.array([[temperature, humidity, rainfall, crop_encoded]])

        probabilities = risk_model.predict_proba(features)[0]

        risk_percentage = int(np.max(probabilities) * 100)

        predicted_disease = disease_encoder.inverse_transform(
            [np.argmax(probabilities)]
        )[0]

        return {
            "risk_percentage": risk_percentage,
            "predicted_disease": predicted_disease,
            "message": f"{match} – {risk_percentage}% risk of {predicted_disease}"
        }

    except Exception as e:
        return {"error": str(e)}


# =========================
# GET CROPS FOR RISK MODEL
# =========================
@app.get("/get_risk_crops")
def get_risk_crops():
    return {
        "crops": crop_encoder.classes_.tolist()
    }


# =========================
# GET CROPS FOR DISEASE MODEL
# =========================
@app.get("/get_disease_crops")
def get_disease_crops():
    return {
        "crops": list(cure_dict.keys())
    }
def get_crops():
    return {
        "crops": crop_encoder.classes_.tolist()
    }
