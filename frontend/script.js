const API = "https://ai-smart-agriculture.onrender.com";

/* =================================================
   AUTO DETECT PAGE & LOAD CORRECT CROPS
================================================= */

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

/* =================================================
   LOAD DISEASE MODEL CROPS (After Infection)
================================================= */

async function loadDiseaseCrops() {
  try {
    const response = await fetch(`${API}/disease_crops/`);
    const data = await response.json();

    populateDropdown(data.crops);

  } catch (error) {
    console.error("Error loading disease crops");
  }
}

/* =================================================
   LOAD RISK MODEL CROPS (Before Infection)
================================================= */

async function loadRiskCrops() {
  try {
    const response = await fetch(`${API}/risk_crops/`);
    const data = await response.json();

    populateDropdown(data.crops);

  } catch (error) {
    console.error("Error loading risk crops");
  }
}

/* =================================================
   COMMON DROPDOWN POPULATOR
================================================= */

function populateDropdown(crops) {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  cropSelect.innerHTML = "";

  crops.forEach(crop => {
    const option = document.createElement("option");
    option.value = crop;
    option.textContent = crop;
    cropSelect.appendChild(option);
  });
}

/* =================================================
   IMAGE PREVIEW (After Infection)
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
   MANUAL / AUTO MODE (Before Infection)
================================================= */

let currentMode = "manual";

function setManualMode() {
  currentMode = "manual";
  document.getElementById("manualSection").style.display = "block";
  document.getElementById("autoSection").style.display = "none";

  document.getElementById("manualBtn").classList.add("active-mode");
  document.getElementById("autoBtn").classList.remove("active-mode");
}

function setAutoMode() {
  currentMode = "auto";
  document.getElementById("manualSection").style.display = "none";
  document.getElementById("autoSection").style.display = "block";

  document.getElementById("manualBtn").classList.remove("active-mode");
  document.getElementById("autoBtn").classList.add("active-mode");

  getCurrentLocationWeather(); // Auto trigger
}

/* =================================================
   WEATHER FROM CURRENT LOCATION
================================================= */

async function getCurrentLocationWeather() {

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  document.getElementById("weatherInfo").innerHTML = "Detecting location...";

  navigator.geolocation.getCurrentPosition(async function(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const API_KEY = "YOUR_OPENWEATHER_API_KEY";

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const rainfall = data.rain ? (data.rain["1h"] || 0) : 0;

      document.getElementById("temp").value = temp;
      document.getElementById("humidity").value = humidity;
      document.getElementById("rainfall").value = rainfall;

      document.getElementById("weatherInfo").innerHTML =
        `Location: ${data.name}<br>
         Temp: ${temp}°C | Humidity: ${humidity}% | Rainfall: ${rainfall}mm`;

    } catch {
      alert("Weather API error");
    }

  }, function() {
    alert("Location permission denied");
  });
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

    saveToHistory("Disease Detection", data);

  } catch {
    alert("Server Error");
  }
}

/* =================================================
   BEFORE INFECTION (Risk Prediction)
================================================= */

async function predictRisk() {

  const crop = document.getElementById("crop")?.value;
  const temperature = document.getElementById("temp")?.value;
  const humidity = document.getElementById("humidity")?.value;
  const rainfall = document.getElementById("rainfall")?.value;

  if (!temperature || !humidity || !rainfall) {
    alert("Please provide weather data");
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
    type: type,
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
