from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle
import numpy as np
import tensorflow as tf
from PIL import Image
import io
from cure_dict import cure_dict

# -------------------------------
# 1️⃣ Create FastAPI app FIRST
# -------------------------------
app = FastAPI()

# -------------------------------
# 2️⃣ Enable CORS (VERY IMPORTANT)
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# 3️⃣ Load ML Models
# -------------------------------
# Risk Model
risk_model = pickle.load(open("model2/disease_risk_model.pkl", "rb"))
crop_encoder = pickle.load(open("model2/crop_encoder.pkl", "rb"))
disease_encoder = pickle.load(open("model2/disease_encoder.pkl", "rb"))

# Disease Detection TFLite Model
interpreter = tf.lite.Interpreter(model_path="model1/smart_agri_model_quant.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# -------------------------------
# 4️⃣ Root Route
# -------------------------------
@app.get("/")
def home():
    return {"message": "AI Smart Agriculture API Running"}

# -------------------------------
# 5️⃣ After Infection (Disease Detection)
# -------------------------------
@app.post("/predict_risk/")
def predict_risk(
    crop: str = Form(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    rainfall: float = Form(...)
):

    crop = crop.lower()

    # Check supported crops
    if crop not in crop_encoder.classes_:
        return {
            "message": f"{crop} not supported. Please choose a supported crop."
        }

    crop_encoded = crop_encoder.transform([crop])[0]

    # IMPORTANT: Correct feature order
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
# -------------------------------
# 6️⃣ Before Infection (Risk Prediction)
# -------------------------------
@app.post("/predict_risk/")
def predict_risk(
    crop: str = Form(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    rainfall: float = Form(...)
):

    crop_encoded = crop_encoder.transform([crop])[0]

    features = np.array([[temperature, humidity, rainfall, crop_encoded]])

    probabilities = risk_model.predict_proba(features)[0]
    risk_percentage = int(max(probabilities) * 100)

    predicted_disease = disease_encoder.inverse_transform(
        [np.argmax(probabilities)]
    )[0]

    return {
        "risk_percentage": risk_percentage,
        "predicted_disease": predicted_disease,
        "message": f"{crop} – {risk_percentage}% risk of {predicted_disease} in next 5 days"
    }

# -------------------------------
# 7️⃣ Run Local (Render ignores this)
# -------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)
