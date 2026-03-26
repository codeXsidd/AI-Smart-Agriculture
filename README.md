# 🌿 AgriVision: AI Smart Agriculture

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://ai-smart-agriculture.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/codeXsidd/AI-Smart-Agriculture?style=for-the-badge)](https://github.com/codeXsidd/AI-Smart-Agriculture)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**AgriVision** is an AI-powered, fully client-side smart agriculture platform that helps farmers diagnose plant diseases and predict crop health risks — **no backend required**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔬 **Disease Diagnosis** | Upload a leaf image → instant AI-powered disease detection with organic & chemical cure recommendations |
| 📊 **Risk Prediction** | Input weather data (temp, humidity, rainfall) → predict disease risk *before* infection occurs |
| 📍 **Auto Weather** | Use your device's GPS + OpenWeatherMap to auto-fill weather conditions |
| 📋 **Prediction History** | All predictions saved locally — review and clear anytime |
| ⚡ **100% Client-Side** | Runs TFLite AI model directly in your browser via TensorFlow.js & WASM — no server needed |
| 📱 **Fully Responsive** | Mobile-first design with hamburger sidebar for all screen sizes |

---

## 🚀 Quick Start

### Option 1: Use the Live Demo
👉 [https://ai-smart-agriculture.vercel.app/](https://ai-smart-agriculture.vercel.app/)

### Option 2: Run Locally (Frontend Only)
```bash
git clone https://github.com/codeXsidd/AI-Smart-Agriculture.git
cd AI-Smart-Agriculture/frontend

# Serve over HTTP (required for model fetch to work)
npx serve .
# or
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

> ⚠️ **Important**: Opening `index.html` directly via `file://` won't work because of browser fetch restrictions. Always serve via HTTP.

### Option 3: Run with Backend (Advanced)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The FastAPI server will start at `http://127.0.0.1:8000`. You can test endpoints at `http://127.0.0.1:8000/docs`.

---

## 🧠 How It Works

```
User uploads leaf image
        ↓
TensorFlow.js loads TFLite model (~11 MB, runs in-browser via WASM)
        ↓
Image preprocessed: resized to 224×224, normalized [0,1]
        ↓
TFLite model runs inference → 65-class probability distribution
        ↓
Top class selected → Disease name + cure recommendation displayed
```

For **Risk Prediction**, a scikit-learn RandomForest model was pre-computed into a JavaScript lookup table (`risk_model.js`), enabling instant serverless predictions.

---

## 📁 Project Structure

```
AI-Smart-Agriculture/
├── frontend/
│   ├── index.html          # Disease Diagnosis page
│   ├── before.html         # Risk Prediction page  
│   ├── history.html        # Prediction History page
│   ├── style.css           # Premium glassmorphism UI
│   ├── script.js           # Client-side AI inference engine
│   ├── disease_data.js     # 65-class disease labels + cure database
│   ├── risk_model.js       # Exported sklearn RandomForest as JS
│   └── model/
│       └── smart_agri_model_quant.tflite   # Quantized TFLite model
└── backend/
    ├── main.py             # FastAPI server (optional)
    ├── cure_dict.py        # Disease cure dictionary
    ├── requirements.txt    # Python dependencies
    ├── model1/             # TFLite disease classification model
    └── model2/             # sklearn risk prediction model + encoders
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, Vanilla CSS (Glassmorphism), JavaScript ES2022 |
| **AI Runtime** | TensorFlow.js 4.x + TFLite WASM Runtime |
| **Disease Model** | MobileNetV2-based TFLite (~11MB, 65-class PlantVillage) |
| **Risk Model** | RandomForest (scikit-learn, exported as JS) |
| **Weather API** | OpenWeatherMap API |
| **Backend (Optional)** | Python, FastAPI, Uvicorn |
| **Deployment** | Vercel (frontend), Render (backend API optional) |

---

## 🌾 Supported Crops (Disease Diagnosis)

Apple • Blueberry • Cherry • Corn/Maize • Grape • Orange • Peach • Pepper • Potato • Raspberry • Soybean • Squash • Strawberry • Tomato

## 🌾 Supported Crops (Risk Prediction)

Potato • Rice • Wheat

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Submit bug reports or feature requests via [Issues](https://github.com/codeXsidd/AI-Smart-Agriculture/issues)
- Fork the repo and submit a Pull Request
- Star ⭐ the repo if you find it useful!

---

## 📝 License

MIT License — free to use, modify, and distribute.
