const BACKEND_URL = "https://ai-smart-agriculture.onrender.com";

function showPage(page) {
    document.getElementById("diseasePage").classList.add("hidden");
    document.getElementById("riskPage").classList.add("hidden");

    if (page === "disease") {
        document.getElementById("diseasePage").classList.remove("hidden");
    } else {
        document.getElementById("riskPage").classList.remove("hidden");
    }
}

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

        if (data.error) {
            resultBox.innerHTML = "❌ " + data.error;
            return;
        }

        resultBox.innerHTML = `
            <h3>${data.disease}</h3>
            <p>Confidence: ${data.confidence_percentage}%</p>
            <p>Severity: ${data.severity_percentage}%</p>
            <p><b>Organic Cure:</b> ${data.organic_cure}</p>
            <p><b>Chemical Cure:</b> ${data.chemical_cure}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "❌ Server sleeping... wait 30 seconds and retry.";
    }
}

async function predictRisk() {
    let resultBox = document.getElementById("riskResult");

    let formData = new FormData();
    formData.append("crop", document.getElementById("crop").value);
    formData.append("temperature", document.getElementById("temp").value);
    formData.append("humidity", document.getElementById("humidity").value);
    formData.append("rainfall", document.getElementById("rainfall").value);

    resultBox.innerHTML = "🔄 Processing...";

    try {
        let response = await fetch(`${BACKEND_URL}/predict_risk/`, {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        if (data.error) {
            resultBox.innerHTML = "❌ " + data.error;
            return;
        }

        resultBox.innerHTML = `
            <h3>${data.predicted_disease}</h3>
            <p>Risk: ${data.risk_percentage}%</p>
            <p>${data.message}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "❌ Server sleeping... wait 30 seconds and retry.";
    }
}
