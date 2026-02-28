const BACKEND_URL = "https://ai-smart-agriculture.onrender.com";

async function uploadImage() {
    let resultBox = document.getElementById("diseaseResult");
    let file = document.getElementById("imageInput").files[0];

    if (!file) {
        alert("Select image");
        return;
    }

    resultBox.innerHTML = "Processing...";

    let formData = new FormData();
    formData.append("file", file);

    try {
        let response = await fetch(`${BACKEND_URL}/predict_disease/`, {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        resultBox.innerHTML = `
            <p><b>Disease:</b> ${data.disease}</p>
            <p><b>Confidence:</b> ${data.confidence_percentage}%</p>
            <p><b>Severity:</b> ${data.severity_percentage}%</p>
            <p><b>Organic Cure:</b> ${data.organic_cure}</p>
            <p><b>Chemical Cure:</b> ${data.chemical_cure}</p>
            <p><b>AI Explanation:</b> ${data.ai_explanation}</p>
            <p><b>Yield Prediction:</b> ${data.yield_prediction}</p>
        `;

    } catch (error) {
        resultBox.innerHTML = "Server sleeping. Wait 30 seconds and try again.";
    }
}

async function predictRisk() {
    let resultBox = document.getElementById("riskResult");

    let formData = new FormData();
    formData.append("crop", document.getElementById("crop").value);
    formData.append("temperature", document.getElementById("temp").value);
    formData.append("humidity", document.getElementById("humidity").value);
    formData.append("rainfall", document.getElementById("rainfall").value);

    resultBox.innerHTML = "Processing...";

    try {
        let response = await fetch(`${BACKEND_URL}/predict_risk/`, {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        resultBox.innerHTML = `
            <p><b>Crop:</b> ${data.crop}</p>
            <p><b>Disease:</b> ${data.predicted_disease}</p>
            <p><b>Risk:</b> ${data.risk_percentage}%</p>
            <p>${data.message}</p>
        `;

    } catch (error) {
        resultBox.innerHTML = "Server sleeping. Wait 30 seconds and try again.";
    }
}
