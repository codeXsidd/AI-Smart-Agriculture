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
# 1️⃣ Create FastAPI app
# -------------------------------
app = FastAPI()

# -------------------------------
# 2️⃣ Enable CORS
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# 3️⃣ Load ML Models
# -------------------------------
risk_model = pickle.load(open("model2/disease_risk_model.pkl", "rb"))
crop_encoder = pickle.load(open("model2/crop_encoder.pkl", "rb"))
disease_encoder = pickle.load(open("model2/disease_encoder.pkl", "rb"))

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
# 5️⃣ Disease Detection (After Infection)
# -------------------------------
@app.post("/predict_disease/")
async def predict_disease(file: UploadFile = File(...)):

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

    disease_name = list(cure_dict.keys())[predicted_class]

    return {
        "disease": disease_name,
        "confidence_percentage": round(confidence * 100, 2),
        "severity_percentage": severity_percentage,
        "ai_explanation": f"{disease_name} detected with {severity_percentage}% severity."
    }

# -------------------------------
# 6️⃣ Risk Prediction (Before Infection)
# -------------------------------
@app.post("/predict_risk/")
def predict_risk(
    crop: str = Form(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    rainfall: float = Form(...)
):

    crop = crop.lower()

    if crop not in crop_encoder.classes_:
        return {
            "message": f"{crop} not supported."
        }

    crop_encoded = crop_encoder.transform([crop])[0]

    # CORRECT feature order
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
# 7️⃣ Run Local
# -------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)
