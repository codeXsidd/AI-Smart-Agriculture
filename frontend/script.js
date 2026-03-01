const API = "https://ai-smart-agriculture.onrender.com";

/* ===========================================
   PAGE AUTO DETECTION
=========================================== */

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

/* ===========================================
   GENERIC FETCH WITH RETRY (IMPORTANT FIX)
=========================================== */

async function fetchWithRetry(url, retries = 3, delay = 3000) {

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Server not ready");
      }

      return await response.json();

    } catch (error) {

      if (i === retries - 1) throw error;

      console.log("Retrying API call...");
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

/* ===========================================
   LOAD DISEASE CROPS
=========================================== */

async function loadDiseaseCrops() {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  cropSelect.innerHTML = "<option>Loading crops...</option>";

  try {

    const data = await fetchWithRetry(API + "/disease_crops/");

    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch (error) {
    cropSelect.innerHTML = "<option>Backend Sleeping... Refresh</option>";
    console.error("Disease crop load error:", error);
  }
}

/* ===========================================
   LOAD RISK CROPS
=========================================== */

async function loadRiskCrops() {

  const cropSelect = document.getElementById("crop");
  if (!cropSelect) return;

  cropSelect.innerHTML = "<option>Loading crops...</option>";

  try {

    const data = await fetchWithRetry(API + "/risk_crops/");

    cropSelect.innerHTML = "";

    data.crops.forEach(crop => {
      const option = document.createElement("option");
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });

  } catch (error) {
    cropSelect.innerHTML = "<option>Backend Sleeping... Refresh</option>";
    console.error("Risk crop load error:", error);
  }
}

/* ===========================================
   IMAGE PREVIEW
=========================================== */

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

/* ===========================================
   AFTER INFECTION
=========================================== */

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

  } catch (error) {
    document.getElementById("diseaseResult").innerHTML = "Server Error";
  }
}

/* ===========================================
   BEFORE INFECTION
=========================================== */

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

  } catch (error) {
    document.getElementById("riskResult").innerHTML = "Server Error";
  }
}
