const API = "https://ai-smart-agriculture.onrender.com";

async function predictDisease() {
  let file = document.getElementById("imageInput").files[0];
  let resultDiv = document.getElementById("diseaseResult");

  if (!file) {
    alert("Upload image");
    return;
  }

  let formData = new FormData();
  formData.append("file", file);

  let response = await fetch(`${API}/predict_disease/`, {
    method: "POST",
    body: formData
  });

  let data = await response.json();

  resultDiv.innerHTML = `
    <div class="result-card">
      <div class="circle">${data.confidence_percentage}%</div>
      <h2>${data.disease}</h2>
      <p><b>Severity:</b> ${data.severity_percentage}%</p>
      <p><b>Organic Cure:</b> ${data.organic_cure}</p>
      <p><b>Chemical Cure:</b> ${data.chemical_cure}</p>
      <p>${data.ai_explanation}</p>
    </div>
  `;
}

async function predictRisk() {
  let formData = new FormData();
  formData.append("crop", document.getElementById("crop").value);
  formData.append("temperature", document.getElementById("temp").value);
  formData.append("humidity", document.getElementById("humidity").value);
  formData.append("rainfall", document.getElementById("rainfall").value);

  let response = await fetch(`${API}/predict_risk/`, {
    method: "POST",
    body: formData
  });

  let data = await response.json();

  document.getElementById("riskResult").innerHTML = `
    <div class="result-card">
      <div class="circle">${data.risk_percentage}%</div>
      <h2>${data.predicted_disease}</h2>
      <p>${data.message}</p>
    </div>
  `;
}
