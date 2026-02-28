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
# 1️⃣ Create App
# ===============================
app = FastAPI()

# ===============================
# 2️⃣ Enable CORS
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# 3️⃣ Safe Model Loading (Render Compatible)
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ---- Risk Model Files ----
risk_model_path = os.path.join(BASE_DIR, "model2", "disease_risk_model.pkl")
crop_encoder_path = os.path.join(BASE_DIR, "model2", "crop_encoder.pkl")
disease_encoder_path = os.path.join(BASE_DIR, "model2", "disease_encoder.pkl")

risk_model = pickle.load(open(risk_model_path, "rb"))
crop_encoder = pickle.load(open(crop_encoder_path, "rb"))
disease_encoder = pickle.load(open(disease_encoder_path, "rb"))

# ---- TFLite Model ----
tflite_model_path = os.path.join(BASE_DIR, "model1", "smart_agri_model_quant.tflite")

interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# ===============================
# 4️⃣ Root Route
# ===============================
@app.get("/")
def home():
    return {"message": "AI Smart Agriculture API Running"}

# ===============================
# 5️⃣ Disease Detection
# ===============================
@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((224, 224))

        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()

        output = interpreter.get_tensor(output_details[0]['index'])[0]

        confidence = float(np.max(output))
        predicted_class = int(np.argmax(output))
        severity_percentage = int(confidence * 100)

        disease_classes = list(cure_dict.keys())

        if predicted_class >= len(disease_classes):
            return {"message": "Prediction class mismatch error"}

        disease_name = disease_classes[predicted_class]

        return {
            "disease": disease_name,
            "confidence_percentage": round(confidence * 100, 2),
            "severity_percentage": severity_percentage,
            "ai_explanation": f"{disease_name} detected with {severity_percentage}% severity."
        }

    except Exception as e:
        return {"message": f"Disease Prediction Error: {str(e)}"}

# ===============================
# 6️⃣ Risk Prediction
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
            return {"message": f"{crop} not supported."}

        crop_encoded = crop_encoder.transform([crop])[0]

        # Correct feature order
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
        return {"message": f"Risk Prediction Error: {str(e)}"}

# ===============================
# 7️⃣ Run Local
# ===============================
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)
