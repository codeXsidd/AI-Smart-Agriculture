const BACKEND_URL = "https://ai-smart-agriculture.onrender.com";

async function uploadImage() {
    const resultBox = document.getElementById("diseaseResult");
    const fileInput = document.getElementById("imageInput");

    if (!fileInput.files[0]) {
        alert("Select image first.");
        return;
    }

    resultBox.innerHTML = "Starting server... Please wait...";

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    let attempts = 0;

    while (attempts < 5) {
        try {
            let response = await fetch(`${BACKEND_URL}/predict_disease/`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error();

            let data = await response.json();

            resultBox.innerHTML = `
                <h3>${data.disease}</h3>
                <p>Confidence: ${data.confidence_percentage}%</p>
                <p>Severity: ${data.severity_percentage}%</p>
                <p><strong>Organic:</strong> ${data.organic_cure}</p>
                <p><strong>Chemical:</strong> ${data.chemical_cure}</p>
            `;
            return;
        } catch (error) {
            attempts++;
            resultBox.innerHTML = "Server waking up... Please wait...";
            await new Promise(r => setTimeout(r, 10000));
        }
    }

    resultBox.innerHTML = "Server still unavailable. Try again later.";
}
