const API = "https://ai-smart-agriculture.onrender.com";

function createResultCard(percent, title, message, isHigh=false) {
  const colorClass = isHigh ? "high" : "low";

  return `
    <div class="result-card ${colorClass}">
      <div class="progress-circle" id="circle">
        ${percent}%
      </div>
      <div>
        <h2>${title}</h2>
        <p>${message}</p>
      </div>
    </div>
  `;
}

async function predictDisease() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return alert("Upload image");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API}/predict_disease`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  document.getElementById("diseaseResult").innerHTML =
    createResultCard(
      data.severity_percentage,
      data.disease,
      data.ai_explanation,
      data.severity_percentage > 60
    );
}

async function predictRisk() {
  const formData = new FormData();
  formData.append("crop", document.getElementById("crop").value);
  formData.append("temperature", document.getElementById("temp").value);
  formData.append("humidity", document.getElementById("humidity").value);
  formData.append("rainfall", document.getElementById("rainfall").value);

  const response = await fetch(`${API}/predict_risk`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  document.getElementById("riskResult").innerHTML =
    createResultCard(
      data.risk_percentage,
      data.predicted_disease,
      data.message,
      data.risk_percentage > 60
    );
}
