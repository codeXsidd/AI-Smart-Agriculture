const API = "https://ai-smart-agriculture.onrender.com";

window.onload = async function() {
  const response = await fetch(`${API}/supported_crops/`);
  const data = await response.json();

  const cropSelect = document.getElementById("crop");
  cropSelect.innerHTML = "";

  data.crops.forEach(crop => {
    const option = document.createElement("option");
    option.value = crop;
    option.textContent = crop;
    cropSelect.appendChild(option);
  });
};

// ================================
// After Infection (Disease Detection)
// ================================

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
    console.log(data);

    if (data.error) {
      document.getElementById("diseaseResult").innerHTML = `
        <div class="result-card high">
          <h2>Model Error</h2>
          <p>${data.error}</p>
        </div>
      `;
      return;
    }

    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card ${data.severity_percentage > 60 ? "high" : "low"}">
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
    alert("Server Error");
  }
}

// ================================
//Before Infection 
// ================================

async function predictRisk() {

  const crop = document.getElementById("crop").value;
  const temperature = document.getElementById("temp").value;
  const humidity = document.getElementById("humidity").value;
  const rainfall = document.getElementById("rainfall").value;

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
    console.log(data);

    if (data.error) {
      document.getElementById("riskResult").innerHTML = `
        <div class="result-card high">
          <h2>Error</h2>
          <p>${data.error}</p>
        </div>
      `;
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
    alert("Server Error");
  }
}
