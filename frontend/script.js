const API = "https://ai-smart-agriculture.onrender.com";

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
  <div class="result-card">
    <div class="progress-container">
      <svg width="150" height="150">
        <circle cx="75" cy="75" r="60" stroke="#eee" stroke-width="12" fill="none"/>
        <circle id="progressCircle"
          cx="75" cy="75" r="60"
          stroke="${data.risk_percentage > 60 ? "#ff4d4d" : "#28a745"}"
          stroke-width="12"
          fill="none"
          stroke-dasharray="377"
          stroke-dashoffset="377"
          transform="rotate(-90 75 75)"
        />
      </svg>
      <div class="progress-text">${data.risk_percentage}%</div>
    </div>

    <div>
      <h2>${data.predicted_disease}</h2>
      <p>${data.message}</p>
    </div>
  </div>
`;

animateCircle(data.risk_percentage);
saveToHistory("Risk", data);
   
  } catch (error) {
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
