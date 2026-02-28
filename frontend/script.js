const API = "https://ai-smart-agriculture.onrender.com";

/* ===============================
   AFTER INFECTION (Disease)
================================ */
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

    // ✅ Proper error handling
    if (data.error) {
      alert("Model Error: " + data.error);
      return;
    }

    if (!data.disease) {
      alert("Unexpected response from server");
      return;
    }

    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card ${data.severity_percentage > 60 ? "high" : "low"}">
        <div class="progress-circle">${data.severity_percentage}%</div>
        <div>
          <h2>${data.disease}</h2>
          <p><b>Confidence:</b> ${data.confidence_percentage}%</p>
          <p>${data.ai_explanation}</p>
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Disease Error:", error);
    alert("Server Error");
  }
}


/* ===============================
   BEFORE INFECTION (Risk)
================================ */
async function predictRisk() {

  const crop = document.getElementById("crop").value;
  const temperature = document.getElementById("temp").value;
  const humidity = document.getElementById("humidity").value;
  const rainfall = document.getElementById("rainfall").value;

  if (!temperature || !humidity || !rainfall) {
    alert("Fill all fields");
    return;
  }

  const formData = new FormData();
  formData.append("crop", crop);
  formData.append("temperature", temperature);
  formData.append("humidity", humidity);
  formData.append("rainfall", rainfall);

  try {
    const response = await fetch(`${API}/predict_risk/`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Risk Response:", data);

    // ✅ Proper error handling
    if (data.error) {
      alert("Model Error: " + data.error);
      return;
    }

    if (!data.risk_percentage) {
      alert("Unexpected response from server");
      return;
    }

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
    console.error("Risk Error:", error);
    alert("Server Error");
  }
}
