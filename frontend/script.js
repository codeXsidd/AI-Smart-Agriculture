/* =================================================
   AgriVision – Client-Side AI Script
   Uses @tensorflow/tfjs to run inference on the
   TFLite model loaded as a flat binary via WASM.
   No backend required — fully client-side!
================================================= */

// ─── GLOBALS ────────────────────────────────────────
let tfliteModel = null;       // holds TFLite interpreter
let modelReady = false;

// ─── PAGE INIT ──────────────────────────────────────
window.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;

  if (path.includes("index.html") || path === "/" || path.endsWith("/")) {
    await initModel();
  }

  if (path.includes("before.html")) {
    populateRiskCrops();
  }

  if (path.includes("history.html")) {
    loadHistory();
  }
});

// ─── MODEL LOADING ──────────────────────────────────
async function initModel() {
  const statusEl   = document.getElementById("modelStatus");
  const statusText = document.getElementById("statusText");
  const statusDot  = statusEl?.querySelector(".status-dot");
  const analyzeBtn = document.getElementById("analyzeBtn");

  if (analyzeBtn) analyzeBtn.disabled = true;

  try {
    setStatus("loading", "Downloading AI model (~11 MB)...", statusDot, statusText);

    // tflite is exposed by @tensorflow/tfjs-tflite
    // loadTFLiteModel accepts a URL and handles fetching + WASM init internally
    tfliteModel = await tflite.loadTFLiteModel("model/smart_agri_model_quant.tflite");

    modelReady = true;
    setStatus("ready", "✅ AI model ready — upload a leaf image to begin", statusDot, statusText);
    if (analyzeBtn) analyzeBtn.disabled = false;

  } catch (err) {
    console.error("Model load error:", err);
    setStatus("error", `⚠️ Could not load AI model: ${err.message}`, statusDot, statusText);
  }
}

function setStatus(type, msg, dot, text) {
  if (dot) {
    dot.className = "status-dot " + type;
  }
  if (text) text.textContent = msg;
}

// ─── DRAG & DROP UPLOAD ─────────────────────────────
const uploadZone = document.getElementById?.("uploadZone");
if (uploadZone) {
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("drag-over");
  });
  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("drag-over");
  });
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("drag-over");
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      showPreview(file);
      document.getElementById("imageInput").files = e.dataTransfer.files;
    }
  });
}

function handleImageSelect(event) {
  const file = event.target.files?.[0];
  if (file) showPreview(file);
}

function showPreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById("imagePreview");
    const previewContainer = document.getElementById("previewContainer");
    const uploadContent = document.getElementById("uploadContent");
    if (preview && previewContainer && uploadContent) {
      preview.src = e.target.result;
      previewContainer.style.display = "flex";
      uploadContent.style.display = "none";
    }
  };
  reader.readAsDataURL(file);
}

function removeImage(event) {
  event.stopPropagation();
  document.getElementById("imageInput").value = "";
  document.getElementById("previewContainer").style.display = "none";
  document.getElementById("uploadContent").style.display = "flex";
  document.getElementById("imagePreview").src = "";
  document.getElementById("diseaseResult").innerHTML = "";
}

// ─── DISEASE PREDICTION ─────────────────────────────
async function predictDisease() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput?.files?.length) {
    showToast("Please upload a leaf image first.", "warning");
    return;
  }
  if (!modelReady) {
    showToast("AI model is still loading. Please wait a moment.", "warning");
    return;
  }

  showSpinner("spinnerContainer");
  document.getElementById("diseaseResult").innerHTML = "";

  try {
    const imgEl  = document.getElementById("imagePreview");

    // ---- Preprocess: resize to 224×224, normalize to [0, 1] ----
    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgEl, 0, 0, 224, 224);
    const imageData = ctx.getImageData(0, 0, 224, 224);

    const inputArray = new Float32Array(224 * 224 * 3);
    for (let i = 0, j = 0; i < imageData.data.length; i += 4, j += 3) {
      inputArray[j]     = imageData.data[i]     / 255.0;   // R
      inputArray[j + 1] = imageData.data[i + 1] / 255.0;   // G
      inputArray[j + 2] = imageData.data[i + 2] / 255.0;   // B
    }

    // ---- Run the real TFLite model ----
    const inputTensor  = tf.tensor4d(inputArray, [1, 224, 224, 3]);
    const outputTensor = tfliteModel.predict(inputTensor);
    const probs        = await outputTensor.data();          // Float32Array[65]
    inputTensor.dispose();
    outputTensor.dispose();

    // ---- Find top-1 prediction ----
    let maxVal = -Infinity, maxIdx = 0;
    for (let i = 0; i < probs.length; i++) {
      if (probs[i] > maxVal) { maxVal = probs[i]; maxIdx = i; }
    }

    const confidence  = Math.round(maxVal * 100);
    const rawLabel    = DISEASE_LABELS[maxIdx % DISEASE_LABELS.length] || "Unknown Disease";
    const cure        = getCure(rawLabel);
    const healthy     = isHealthy(rawLabel);
    const displayName = formatDiseaseName(rawLabel);

    hideSpinner("spinnerContainer");
    renderDiseaseResult(displayName, confidence, cure, healthy);
    saveToHistory("Disease Diagnosis", {
      disease: displayName,
      confidence_percentage: confidence,
      organic_cure: cure.organic,
      chemical_cure: cure.chemical
    });

  } catch (err) {
    hideSpinner("spinnerContainer");
    console.error("Inference error:", err);
    document.getElementById("diseaseResult").innerHTML = `
      <div class="result-card high">
        <div class="result-header">
          <div class="result-body">
            <h2>⚠️ Analysis Error</h2>
            <p>${err.message || "Failed to process image. Try a clearer leaf photo."}</p>
          </div>
        </div>
      </div>`;
  }
}

function renderDiseaseResult(displayName, confidence, cure, healthy) {
  const severity = healthy ? 0 : confidence;
  const colorClass = healthy ? "healthy" : (confidence > 70 ? "high" : confidence > 40 ? "medium" : "low-risk");
  const emoji = healthy ? "✅" : (confidence > 70 ? "🚨" : "⚠️");

  document.getElementById("diseaseResult").innerHTML = `
    <div class="result-card ${colorClass} slide-up">
      <div class="result-header">
        <div class="severity-ring" style="--pct:${severity}%">
          <div class="ring-inner">${confidence}%</div>
        </div>
        <div class="result-body">
          <div class="result-tag">${emoji} ${healthy ? "Healthy Plant" : "Disease Detected"}</div>
          <h2>${displayName}</h2>
          <p class="confidence-bar-label">Confidence: ${confidence}%</p>
          <div class="confidence-bar"><div class="confidence-fill" style="width:${confidence}%"></div></div>
        </div>
      </div>
      ${!healthy ? `
      <div class="cure-section">
        <div class="cure-card organic">
          <div class="cure-title">🌿 Organic Cure</div>
          <p>${cure.organic}</p>
        </div>
        <div class="cure-card chemical">
          <div class="cure-title">🧪 Chemical Cure</div>
          <p>${cure.chemical}</p>
        </div>
      </div>` : `
      <div class="healthy-msg">
        <p>Great news! Your plant appears healthy. Continue good agricultural practices.</p>
      </div>`}
    </div>`;
}

// ─── RISK PREDICTION ────────────────────────────────
function populateRiskCrops() {
  const select = document.getElementById("crop");
  if (!select || typeof RISK_CROPS === "undefined") return;
  select.innerHTML = '<option value="">-- Choose a crop --</option>';
  RISK_CROPS.forEach(crop => {
    const opt = document.createElement("option");
    opt.value = crop;
    opt.textContent = crop;
    select.appendChild(opt);
  });
}

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

async function getCurrentLocationWeather() {
  if (!navigator.geolocation) {
    showToast("Geolocation is not supported by your browser.", "warning");
    return;
  }

  document.getElementById("weatherInfo").textContent = "📍 Detecting your location...";
  document.getElementById("weatherCard").style.display = "block";

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    const API_KEY = "ae5bb22c76691a235ade9aabecf3d0db";

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const data = await res.json();

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const rainfall = data.rain ? (data.rain["1h"] || 0) : 0;

      document.getElementById("temp").value = temp;
      document.getElementById("humidity").value = humidity;
      document.getElementById("rainfall").value = rainfall;
      document.getElementById("tempDisplay").textContent = `${temp}°C`;
      document.getElementById("humDisplay").textContent = `${humidity}%`;
      document.getElementById("rainDisplay").textContent = `${rainfall}mm`;
      document.getElementById("weatherInfo").innerHTML = `📍 <strong>${data.name}, ${data.sys.country}</strong>`;

    } catch (err) {
      showToast("Failed to fetch weather data. Check internet connection.", "error");
    }
  }, () => {
    showToast("Location permission denied. Please use Manual Input.", "warning");
  });
}

function predictRisk() {
  const crop = document.getElementById("crop")?.value;
  const temperature = parseFloat(document.getElementById("temp")?.value);
  const humidity = parseFloat(document.getElementById("humidity")?.value);
  const rainfall = parseFloat(document.getElementById("rainfall")?.value);

  if (!crop) { showToast("Please select a crop.", "warning"); return; }
  if (isNaN(temperature) || isNaN(humidity) || isNaN(rainfall)) {
    showToast("Please fill in all weather fields.", "warning");
    return;
  }

  showSpinner("riskSpinner");
  document.getElementById("riskResult").innerHTML = "";

  // Small delay for UX feel
  setTimeout(() => {
    const result = predictRiskJS(crop, temperature, humidity, rainfall);
    hideSpinner("riskSpinner");

    if (result.error) {
      document.getElementById("riskResult").innerHTML = `<div class="result-card high"><div class="result-body"><h2>⚠️ Error</h2><p>${result.error}</p></div></div>`;
      return;
    }

    const colorClass = result.risk_percentage > 60 ? "high" : result.risk_percentage > 35 ? "medium" : "low-risk";
    const emoji = result.risk_percentage > 60 ? "🚨" : result.risk_percentage > 35 ? "⚠️" : "✅";

    document.getElementById("riskResult").innerHTML = `
      <div class="result-card ${colorClass} slide-up">
        <div class="result-header">
          <div class="severity-ring" style="--pct:${result.risk_percentage}%">
            <div class="ring-inner">${result.risk_percentage}%</div>
          </div>
          <div class="result-body">
            <div class="result-tag">${emoji} Risk Assessment</div>
            <h2>${result.predicted_disease}</h2>
            <p>${result.message}</p>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width:${result.risk_percentage}%"></div>
            </div>
          </div>
        </div>
        <div class="risk-tips">
          ${result.risk_percentage > 60
            ? `<p>🔴 <strong>High Risk:</strong> Immediate preventive action recommended. Monitor crop daily and consider applying appropriate treatments.</p>`
            : result.risk_percentage > 35
            ? `<p>🟡 <strong>Moderate Risk:</strong> Exercise caution. Inspect crops regularly and maintain good agricultural hygiene.</p>`
            : `<p>🟢 <strong>Low Risk:</strong> Conditions are favorable. Maintain current practices and keep monitoring.</p>`}
        </div>
      </div>`;

    saveToHistory("Risk Prediction", result);
  }, 600);
}

// ─── HISTORY ─────────────────────────────────────────
function saveToHistory(type, data) {
  let history = JSON.parse(localStorage.getItem("agriHistory") || "[]");
  history.push({ type, date: new Date().toLocaleString(), result: data });
  localStorage.setItem("agriHistory", JSON.stringify(history));
}

function loadHistory() {
  const container = document.getElementById("historyContainer");
  const countEl = document.getElementById("historyCount");
  if (!container) return;

  const history = JSON.parse(localStorage.getItem("agriHistory") || "[]");

  if (countEl) countEl.textContent = `${history.length} record${history.length !== 1 ? "s" : ""}`;

  if (history.length === 0) {
    container.innerHTML = `<div class="empty-history"><div class="empty-icon">📋</div><p>No predictions yet. Start diagnosing!</p></div>`;
    return;
  }

  container.innerHTML = [...history].reverse().map((item, i) => {
    const isDisease = item.type === "Disease Diagnosis";
    const badge = isDisease ? "🔬 Disease Diagnosis" : "📊 Risk Prediction";
    const detail = isDisease
      ? `<p><strong>Disease:</strong> ${item.result.disease}</p><p><strong>Confidence:</strong> ${item.result.confidence_percentage}%</p>`
      : `<p><strong>Risk:</strong> ${item.result.predicted_disease} (${item.result.risk_percentage}%)</p><p>${item.result.message}</p>`;

    return `
      <div class="history-card slide-up" style="animation-delay:${i * 0.05}s">
        <div class="history-header">
          <span class="history-badge ${isDisease ? "badge-disease" : "badge-risk"}">${badge}</span>
          <span class="history-date">📅 ${item.date}</span>
        </div>
        ${detail}
      </div>`;
  }).join("");
}

function clearHistory() {
  if (confirm("Clear all prediction history?")) {
    localStorage.removeItem("agriHistory");
    loadHistory();
  }
}

// ─── MOBILE SIDEBAR ──────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("visible");
}

// ─── SPINNER UTILS ───────────────────────────────────
function showSpinner(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "flex";
}

function hideSpinner(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

// ─── TOAST NOTIFICATIONS ─────────────────────────────
function showToast(message, type = "info") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("visible"));
  setTimeout(() => { toast.classList.remove("visible"); setTimeout(() => toast.remove(), 300); }, 3500);
}
