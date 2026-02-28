const API = "https://ai-smart-agriculture.onrender.com";

async function predictDisease() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) {
    alert("Upload image first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API}/predict_disease/`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Disease Response:", data);

    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card low">
        <div class="progress-circle">${data.severity_percentage}%</div>
        <div>
          <h2>${data.disease}</h2>
          <p><b>Confidence:</b> ${data.confidence_percentage}%</p>
          <p>${data.ai_explanation}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    alert("Server Error");
  }
}

async function predictRisk() {
  const formData = new FormData();
  formData.append("crop", document.getElementById("crop").value);
  formData.append("temperature", document.getElementById("temp").value);
  formData.append("humidity", document.getElementById("humidity").value);
  formData.append("rainfall", document.getElementById("rainfall").value);

  try {
    const response = await fetch(`${API}/predict_risk/`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Risk Response:", data);

    document.getElementById("riskResult").innerHTML = `
      <div class="result-card ${data.risk_percentage > 60 ? "high" : "low"}">
        <div class="progress-circle">${data.risk_percentage}%</div>
        <div>
          <h2>${data.predicted_disease}</h2>
          <p>${data.message}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    alert("Server Error");
  }
}
