const API = "https://ai-smart-agriculture.onrender.com";

/* ========================================
   AUTO LOAD BASED ON PAGE NAME
======================================== */

window.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname;

  if (path.includes("index.html")) {
    loadDiseaseCrops();
  }

  if (path.includes("before.html")) {
    loadRiskCrops();
  }

  if (path.includes("history.html")) {
    loadHistory();
  }

});

/* ========================================
   LOAD CROPS FOR AFTER INFECTION
======================================== */

async function loadDiseaseCrops() {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  cropSelect.innerHTML = "<option>Loading crops...</option>";

  try {

    const response = await fetch(API + "/disease_crops/");
    const data = await response.json();

    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch (error) {
    cropSelect.innerHTML = "<option>Server not responding</option>";
  }
}

/* ========================================
   LOAD CROPS FOR BEFORE INFECTION
======================================== */

async function loadRiskCrops() {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  cropSelect.innerHTML = "<option>Loading crops...</option>";

  try {

    const response = await fetch(API + "/risk_crops/");
    const data = await response.json();

    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch (error) {
    cropSelect.innerHTML = "<option>Server not responding</option>";
  }
}

/* ========================================
   IMAGE PREVIEW
======================================== */

function previewImage(event) {

  const file = event.target.files[0];
  const preview = document.getElementById("imagePreview");

  if (!file || !preview) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

/* ========================================
   AFTER INFECTION PREDICTION
======================================== */

async function predictDisease() {

  const fileInput = document.getElementById("imageInput");

  if (!fileInput.files.length) {
    alert("Upload image first");
    return;
  }

  document.getElementById("diseaseResult").innerHTML = "Analyzing...";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {

    const response = await fetch(API + "/predict_disease/", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById("diseaseResult").innerHTML = data.error;
      return;
    }

    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card">
        <h2>${data.disease}</h2>
        <p><b>Confidence:</b> ${data.confidence_percentage}%</p>
        <p>${data.ai_explanation}</p>
      </div>
    `;

    saveToHistory("Disease Detection", data);

  } catch {
    document.getElementById("diseaseResult").innerHTML = "Server Error";
  }
}

/* ========================================
   BEFORE INFECTION PREDICTION
======================================== */

async function predictRisk() {

  const crop = document.getElementById("crop").value;
  const temp = document.getElementById("temp").value;
  const humidity = document.getElementById("humidity").value;
  const rainfall = document.getElementById("rainfall").value;

  if (!temp || !humidity || !rainfall) {
    alert("Enter weather values");
    return;
  }

  document.getElementById("riskResult").innerHTML = "Predicting...";

  const formData = new FormData();
  formData.append("crop", crop);
  formData.append("temperature", temp);
  formData.append("humidity", humidity);
  formData.append("rainfall", rainfall);

  try {

    const response = await fetch(API + "/predict_risk/", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById("riskResult").innerHTML = data.error;
      return;
    }

    document.getElementById("riskResult").innerHTML = `
      <div class="result-card">
        <h2>${data.predicted_disease}</h2>
        <p>${data.message}</p>
      </div>
    `;

    saveToHistory("Risk Prediction", data);

  } catch {
    document.getElementById("riskResult").innerHTML = "Server Error";
  }
}

/* ========================================
   LOCAL STORAGE HISTORY
======================================== */

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

    let content = "";

    if (item.type === "Disease Detection") {
      content = `
        <p><b>Disease:</b> ${item.result.disease}</p>
        <p><b>Confidence:</b> ${item.result.confidence_percentage}%</p>
      `;
    }

    if (item.type === "Risk Prediction") {
      content = `
        <p><b>Prediction:</b> ${item.result.predicted_disease}</p>
        <p><b>Risk %:</b> ${item.result.risk_percentage}%</p>
      `;
    }

    container.innerHTML += `
      <div class="history-card">
        <h3>${item.type}</h3>
        <p>${item.date}</p>
        ${content}
      </div>
    `;
  });
}

function clearHistory() {
  localStorage.removeItem("agriHistory");
  loadHistory();
}
