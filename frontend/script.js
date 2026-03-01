const API = "https://ai-smart-agriculture.onrender.com";
// ================================

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
}

async function getWeather() {
  const city = document.getElementById("city").value;
  const API_KEY = "ae5bb22c76691a235ade9aabecf3d0db";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const rainfall = data.rain ? data.rain["1h"] || 0 : 0;

    // Auto fill hidden manual inputs
    document.getElementById("temp").value = temp;
    document.getElementById("humidity").value = humidity;
    document.getElementById("rainfall").value = rainfall;

    document.getElementById("weatherInfo").innerHTML =
      `Temp: ${temp}°C | Humidity: ${humidity}% | Rainfall: ${rainfall}mm`;

  } catch {
    alert("Weather API Error");
  }
}

// ================================
// Load crops when page loads
window.addEventListener("DOMContentLoaded", loadCrops);

async function loadCrops() {
  try {
    const response = await fetch(`${API}/get_crops`);
    const data = await response.json();

    const cropSelect = document.getElementById("crop");
    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Failed to load crops:", error);
  }
}

// ================================

 window.onload = async function () {
    try {
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

    } catch (error) {
      document.getElementById("crop").innerHTML =
        "<option>Error loading crops</option>";
    }
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
    saveToHistory("Disease", data);
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

  if (!temperature || !humidity || !rainfall) {
    alert("Please provide weather data");
    return;
  }

  document.getElementById("riskResult").innerHTML = "<p>Loading...</p>";

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

    saveToHistory("Risk", data);

  } catch {
    alert("Server Error");
  }
}




function animateCircle(percent) {
  const circle = document.getElementById("progressCircle");
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  circle.style.strokeDashoffset = offset;
}


function saveToHistory(type, data) {
  let history = JSON.parse(localStorage.getItem("agriHistory")) || [];

  history.push({
    type: type,
    date: new Date().toLocaleString(),
    result: data
  });

  localStorage.setItem("agriHistory", JSON.stringify(history));
}
