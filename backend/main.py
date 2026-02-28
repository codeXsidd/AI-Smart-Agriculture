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
risk_model = pickle.load(open("disease_risk_model.pkl", "rb"))
crop_encoder = pickle.load(open("crop_encoder.pkl", "rb"))
disease_encoder = pickle.load(open("disease_encoder.pkl", "rb"))

# Disease Detection TFLite Model
interpreter = tf.lite.Interpreter(model_path="smart_agri_model_quant.tflite")
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
@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image.astype(np.float32), axis=0)

    interpreter.set_tensor(input_details[0]['index'], image)
    interpreter.invoke()

    output = interpreter.get_tensor(output_details[0]['index'])
    confidence = float(np.max(output))
    predicted_index = int(np.argmax(output))

    # Dummy disease names (replace with real if you have)
    disease_names = list(cure_dict.keys())
    disease = disease_names[predicted_index % len(disease_names)]

    severity_percentage = int(confidence * 100)

    return {
        "disease": disease,
        "confidence_percentage": round(confidence * 100, 2),
        "severity_percentage": severity_percentage,
        "organic_cure": cure_dict[disease]["organic"],
        "chemical_cure": cure_dict[disease]["chemical"],
        "ai_explanation": f"{disease} detected with {severity_percentage}% severity."
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
