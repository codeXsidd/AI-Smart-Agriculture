const BACKEND_URL = "https://ai-smart-agriculture.onrender.com";

async function uploadImage() {
    let file = document.getElementById("imageInput").files[0];
    let resultBox = document.getElementById("diseaseResult");

    if (!file) {
        alert("Select image first");
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
            <h3>${data.disease}</h3>
            <p>Confidence: ${data.confidence_percentage}%</p>
            <p>Severity: ${data.severity_percentage}%</p>
            <p><b>Organic:</b> ${data.organic_cure}</p>
            <p><b>Chemical:</b> ${data.chemical_cure}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "Error connecting to server.";
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
            <h3>${data.predicted_disease}</h3>
            <p>Risk: ${data.risk_percentage}%</p>
            <p>${data.message}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "Error connecting to server.";
    }
}
