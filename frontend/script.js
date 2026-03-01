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

    // 🔴 If backend returns error
    if (data.error) {
      document.getElementById("diseaseResult").innerHTML = `
        <div class="result-card high">
          <div>
            <h2>Model Error</h2>
            <p>${data.error}</p>
          </div>
        </div>
      `;
      return;
    }

    if (!data.disease) {
      alert("Model did not return valid output");
      return;
    }

    const riskClass =
      data.severity_percentage > 60 ? "high" : "low";

    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card ${riskClass}">
        <div class="progress-circle">${data.severity_percentage}%</div>
        <div>
          <h2>${data.disease}</h2>
          <p><b>Confidence:</b> ${data.confidence_percentage}%</p>
          <p>${data.ai_explanation}</p>
          <p><b>Organic Cure:</b> ${data.organic_cure}</p>
          <p><b>Chemical Cure:</b> ${data.chemical_cure}</p>
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Error:", error);
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

    // 🔴 If backend returns error
    if (data.error) {
      document.getElementById("riskResult").innerHTML = `
        <div class="result-card high">
          <div>
            <h2>Error</h2>
            <p>${data.error}</p>
          </div>
        </div>
      `;
      return;
    }

    if (!data.risk_percentage) {
      alert("Model did not return valid output");
      return;
    }

    const riskClass =
      data.risk_percentage > 60 ? "high" : "low";

    document.getElementById("riskResult").innerHTML = `
      <div class="result-card ${riskClass}">
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
