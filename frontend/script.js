const API = "https://ai-smart-agriculture.onrender.com";

/* =================================================
   LOAD CROPS BASED ON PAGE
================================================= */

window.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("imageInput")) {
    loadDiseaseCrops();   // index.html
  }

  if (document.getElementById("manualSection")) {
    loadRiskCrops();      // before.html
  }

  if (document.getElementById("historyContainer")) {
    loadHistory();        // history.html
  }

});

/* =================================================
   LOAD DISEASE MODEL CROPS (After Infection)
================================================= */

async function loadDiseaseCrops() {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  try {
    const response = await fetch(`${API}/disease_crops/`);
    const data = await response.json();

    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch {
    cropSelect.innerHTML = "<option>Error loading crops</option>";
  }
}

/* =================================================
   LOAD RISK MODEL CROPS (Before Infection)
================================================= */

async function loadRiskCrops() {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  try {
    const response = await fetch(`${API}/risk_crops/`);
    const data = await response.json();

    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch {
    cropSelect.innerHTML = "<option>Error loading crops</option>";
  }
}

/* =================================================
   IMAGE PREVIEW
================================================= */

function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("imagePreview");

  if (file && preview) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

/* =================================================
   AFTER INFECTION (Disease Detection)
================================================= */

async function predictDisease() {

  const fileInput = document.getElementById("imageInput");

  if (!fileInput || !fileInput.files.length) {
    alert("Upload image first");
    return;
  }

  document.getElementById("diseaseResult").innerHTML = "Analyzing...";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {

    const response = await fetch(`${API}/predict_disease/`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById("diseaseResult").innerHTML =
        `<div class="result-card high">${data.error}</div>`;
      return;
    }

    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card ${data.severity_percentage > 60 ? "high" : "low"}">
        <h2>${data.disease}</h2>
        <p><b>Confidence:</b> ${data.confidence_percentage}%</p>
        <p>${data.ai_explanation}</p>
      </div>
    `;

    saveToHistory("Disease Detection", data);

  } catch {
    alert("Server Error");
  }
}

/* =================================================
   BEFORE INFECTION (Risk Prediction)
================================================= */

async function predictRisk() {

  const crop = document.getElementById("crop").value;
  const temperature = document.getElementById("temp").value;
  const humidity = document.getElementById("humidity").value;
  const rainfall = document.getElementById("rainfall").value;

  if (!temperature || !humidity || !rainfall) {
    alert("Provide weather data");
    return;
  }

  document.getElementById("riskResult").innerHTML = "Predicting...";

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

    if (data.error) {
      document.getElementById("riskResult").innerHTML =
        `<div class="result-card high">${data.error}</div>`;
      return;
    }

    document.getElementById("riskResult").innerHTML = `
      <div class="result-card ${data.risk_percentage > 60 ? "high" : "low"}">
        <h2>${data.predicted_disease}</h2>
        <p>${data.message}</p>
      </div>
    `;

    saveToHistory("Risk Prediction", data);

  } catch {
    alert("Server Error");
  }
}

/* =================================================
   LOCAL STORAGE HISTORY
================================================= */

function saveToHistory(type, data) {

  let history = JSON.parse(localStorage.getItem("agriHistory")) || [];

  history.push({
    type,
    date: new Date().toLocaleString(),
    result: data
  });

  localStorage.setItem("agriHistory", JSON.stringify(history));
}

function loadHistory() {

  const container = document.getElementById("historyContainer");
  if (!container) return;

  let history = JSON.parse(localStorage.getItem("agriHistory")) || [];

  if (history.length === 0) {
    container.innerHTML = "<p>No prediction history available.</p>";
    return;
  }

  container.innerHTML = "";

  history.reverse().forEach(item => {

    let resultHTML = "";

    if (item.type === "Disease Detection") {
      resultHTML = `
        <p><b>Disease:</b> ${item.result.disease}</p>
        <p><b>Confidence:</b> ${item.result.confidence_percentage}%</p>
      `;
    }

    if (item.type === "Risk Prediction") {
      resultHTML = `
        <p><b>Prediction:</b> ${item.result.predicted_disease}</p>
        <p><b>Risk %:</b> ${item.result.risk_percentage}%</p>
      `;
    }

    container.innerHTML += `
      <div class="history-card">
        <h3>${item.type}</h3>
        <p><b>Date:</b> ${item.date}</p>
        ${resultHTML}
      </div>
    `;
  });
}

function clearHistory() {
  localStorage.removeItem("agriHistory");
  loadHistory();
}
