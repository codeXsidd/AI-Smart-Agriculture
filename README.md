# 🌿 AgriVision: AI Smart Agriculture

AgriVision is an AI-powered smart agriculture platform that helps farmers diagnose plant diseases and predict crop health risks before they happen.

## ✨ Features
- **Disease Diagnosis (After Infection):** Upload an image of a plant leaf and get an AI-powered diagnosis on the disease, including tailored organic and chemical cures.
- **Risk Prediction (Before Infection):** Input weather data (temperature, humidity, rainfall) or use auto-location to predict potential crop diseases *before* they occur.
- **Modern UI:** Features a premium, glassmorphism-inspired design for an intuitive and beautiful user experience.
- **Machine Learning Integration:** Uses robust TensorFlow Lite and Scikit-Learn models on a FastAPI backend.

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/codeXsidd/AI-Smart-Agriculture.git
cd AI-Smart-Agriculture
```

### 2. Backend Setup
1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will now be running at `http://127.0.0.1:8000`.

### 3. Frontend Setup
1. Open the `frontend` folder.
2. Open `index.html` directly in your favorite web browser!
*(Since the `script.js` has been configured to point to `http://127.0.0.1:8000`, it will automatically communicate with your local backend).*

## 🛠️ Tech Stack
- **Frontend:** HTML5, Modern CSS (Glassmorphism), Vanilla JavaScript.
- **Backend:** Python, FastAPI, Uvicorn.
- **AI/ML Models:** TensorFlow Lite (Image Classification), Scikit-Learn (Risk Prediction Pipeline).

## 📝 License
This project is open-source. Feel free to contribute or use it for your own crop prediction tasks!
