const BACKEND_URL = "https://ai-smart-agriculture.onrender.com";

async function uploadImage() {
    let fileInput = document.getElementById("imageInput");
    let resultBox = document.getElementById("diseaseResult");

    if (!fileInput.files[0]) {
        alert("Please select an image.");
        return;
    }

    resultBox.innerHTML = "🔄 Processing...";

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        let response = await fetch(`${BACKEND_URL}/predict_disease/`, {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        resultBox.innerHTML = `
            <h3>Prediction Result</h3>
            <p><strong>Disease:</strong> ${data.disease}</p>
            <p><strong>Confidence:</strong> ${data.confidence_percentage}%</p>
            <p><strong>Severity:</strong> ${data.severity_percentage}%</p>
            <p><strong>Organic Cure:</strong> ${data.organic_cure}</p>
            <p><strong>Chemical Cure:</strong> ${data.chemical_cure}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "❌ Error connecting to server.";
    }
}

async function predictRisk() {
    let resultBox = document.getElementById("riskResult");

    let crop = document.getElementById("crop").value;
    let temp = document.getElementById("temp").value;
    let humidity = document.getElementById("humidity").value;
    let rainfall = document.getElementById("rainfall").value;

    if (!crop || !temp || !humidity || !rainfall) {
        alert("Please fill all fields.");
        return;
    }

    resultBox.innerHTML = "🔄 Processing...";

    let formData = new FormData();
    formData.append("crop", crop);
    formData.append("temperature", temp);
    formData.append("humidity", humidity);
    formData.append("rainfall", rainfall);

    try {
        let response = await fetch(`${BACKEND_URL}/predict_risk/`, {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        resultBox.innerHTML = `
            <h3>Risk Prediction</h3>
            <p><strong>Crop:</strong> ${data.crop}</p>
            <p><strong>Disease:</strong> ${data.predicted_disease}</p>
            <p><strong>Risk:</strong> ${data.risk_percentage}%</p>
            <p>${data.message}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "❌ Error connecting to server.";
    }
}
