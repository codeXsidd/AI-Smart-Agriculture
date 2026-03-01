const BASE_URL = "https://ai-smart-agriculture.onrender.com";

async function predictDisease() {
    const fileInput = document.getElementById("imageInput");
    const plant = document.getElementById("plantSelect").value;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("plant", plant);

    try {
        const response = await fetch(`${BASE_URL}/predict`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("result").innerHTML =
            `<h3>Disease: ${data.disease}</h3>
             <p>Severity: ${data.severity}%</p>
             <p>Organic Cure: ${data.organic}</p>
             <p>Chemical Cure: ${data.chemical}</p>`;
    } catch (error) {
        document.getElementById("result").innerHTML =
            "❌ Error connecting to server.";
    }
}
async function predictRisk() {
    const plant = document.getElementById("riskPlant").value;
    const temp = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;
    const rainfall = document.getElementById("rainfall").value;

    try {
        const response = await fetch(`${BASE_URL}/risk`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                crop: plant,
                temperature: temp,
                humidity: humidity,
                rainfall: rainfall
            })
        });

        const data = await response.json();

        document.getElementById("riskResult").innerHTML =
            `<h3>${data.message}</h3>`;
    } catch (error) {
        document.getElementById("riskResult").innerHTML =
            "❌ Error connecting to server.";
    }
}
