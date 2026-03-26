// =====================================================
// Disease Labels - 65-class PlantVillage dataset
// These correspond to the output indices of smart_agri_model_quant.tflite
// =====================================================
const DISEASE_LABELS = [
  "Apple___Apple_scab",
  "Apple___Black_rot",
  "Apple___Cedar_apple_rust",
  "Apple___healthy",
  "Blueberry___healthy",
  "Cherry_(including_sour)___Powdery_mildew",
  "Cherry_(including_sour)___healthy",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
  "Corn_(maize)___Common_rust_",
  "Corn_(maize)___Northern_Leaf_Blight",
  "Corn_(maize)___healthy",
  "Grape___Black_rot",
  "Grape___Esca_(Black_Measles)",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
  "Grape___healthy",
  "Orange___Haunglongbing_(Citrus_greening)",
  "Peach___Bacterial_spot",
  "Peach___healthy",
  "Pepper,_bell___Bacterial_spot",
  "Pepper,_bell___healthy",
  "Potato___Early_blight",
  "Potato___Late_blight",
  "Potato___healthy",
  "Raspberry___healthy",
  "Soybean___healthy",
  "Squash___Powdery_mildew",
  "Strawberry___Leaf_scorch",
  "Strawberry___healthy",
  "Tomato___Bacterial_spot",
  "Tomato___Early_blight",
  "Tomato___Late_blight",
  "Tomato___Leaf_Mold",
  "Tomato___Septoria_leaf_spot",
  "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato___Target_Spot",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
  "Tomato___Tomato_mosaic_virus",
  "Tomato___healthy",
  "Apple___Apple_scab",
  "Apple___Black_rot",
  "Apple___Cedar_apple_rust",
  "Apple___healthy",
  "Blueberry___healthy",
  "Cherry_(including_sour)___Powdery_mildew",
  "Cherry_(including_sour)___healthy",
  "Corn_(maize)___Cercospora_leaf_spot",
  "Corn_(maize)___Common_rust",
  "Corn_(maize)___Northern_Leaf_Blight",
  "Corn_(maize)___healthy",
  "Grape___Black_rot",
  "Grape___Esca",
  "Grape___Leaf_blight",
  "Grape___healthy",
  "Orange___Citrus_Greening",
  "Peach___Bacterial_spot",
  "Peach___healthy",
  "Pepper___Bacterial_spot",
  "Pepper___healthy",
  "Potato___Early_blight",
  "Potato___Late_blight",
  "Potato___healthy",
  "Raspberry___healthy",
  "Soybean___healthy",
  "Squash___Powdery_mildew",
  "Strawberry___Leaf_scorch"
];

// =====================================================
// Cure Database — covers all detectable diseases
// =====================================================
const CURE_DB = {
  "Apple___Apple_scab": {
    organic: "Apply sulfur-based sprays or neem oil during early bud stages. Remove and destroy infected leaves.",
    chemical: "Use fungicides containing myclobutanil or captan. Apply preventively before symptoms appear."
  },
  "Apple___Black_rot": {
    organic: "Prune infected branches, remove mummified fruits. Apply copper-based sprays.",
    chemical: "Apply fungicides with thiophanate-methyl or captan from pink stage through harvest."
  },
  "Apple___Cedar_apple_rust": {
    organic: "Remove nearby juniper/cedar trees if possible. Apply sulfur sprays during infection periods.",
    chemical: "Use fungicides with triadimefon or myclobutanil starting at pink bud stage."
  },
  "Apple___healthy": { organic: "No treatment needed. Maintain good cultural practices.", chemical: "No treatment needed." },
  "Blueberry___healthy": { organic: "No treatment needed. Maintain soil pH 4.5–5.5.", chemical: "No treatment needed." },
  "Cherry_(including_sour)___Powdery_mildew": {
    organic: "Apply potassium bicarbonate or neem oil sprays. Ensure good air circulation.",
    chemical: "Use sulfur-based fungicides or trifloxystrobin. Avoid overhead irrigation."
  },
  "Cherry_(including_sour)___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    organic: "Rotate crops, use resistant varieties, and improve air circulation by proper spacing.",
    chemical: "Apply strobilurin fungicides (azoxystrobin) at early symptom detection."
  },
  "Corn_(maize)___Common_rust_": {
    organic: "Plant resistant hybrids. Remove heavily infected plants to reduce spread.",
    chemical: "Apply triazole fungicides (propiconazole) at early tassel stage if rust is severe."
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    organic: "Use disease-resistant varieties. Ensure proper crop rotation.",
    chemical: "Apply fungicides with azoxystrobin or propiconazole beginning at early symptoms."
  },
  "Corn_(maize)___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Grape___Black_rot": {
    organic: "Remove mummified berries and infected canes. Apply copper-based Bordeaux mixture.",
    chemical: "Use myclobutanil or mancozeb sprays from early shoot through harvest."
  },
  "Grape___Esca_(Black_Measles)": {
    organic: "Remove and destroy infected wood. Protect pruning wounds with wound sealant.",
    chemical: "No fully effective chemical treatment exists. Use systemic fungicide injections for management."
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    organic: "Improve vineyard air circulation. Apply copper-based fungicides.",
    chemical: "Use captam or mancozeb applications during wet seasons."
  },
  "Grape___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Orange___Haunglongbing_(Citrus_greening)": {
    organic: "Remove and destroy infected trees. Control the Asian citrus psyllid vector with sticky traps.",
    chemical: "Use systemic insecticides to control psyllids. No cure exists; manage by removing infected trees."
  },
  "Peach___Bacterial_spot": {
    organic: "Apply copper-based bactericides in spring. Use resistant varieties.",
    chemical: "Apply oxytetracycline or copper hydroxide from green tip through petal fall."
  },
  "Peach___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Pepper,_bell___Bacterial_spot": {
    organic: "Avoid overhead irrigation, use disease-free seeds, apply copper bactericides.",
    chemical: "Use copper hydroxide or streptomycin combined with good crop rotation."
  },
  "Pepper,_bell___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Potato___Early_blight": {
    organic: "Apply neem oil or copper fungicides. Remove infected foliage promptly.",
    chemical: "Use chlorothalonil or mancozeb fungicides applied every 7–10 days during humid conditions."
  },
  "Potato___Late_blight": {
    organic: "Apply copper-based Bordeaux mixture. Destroy infected plant debris immediately.",
    chemical: "Use systemic fungicides like metalaxyl or cymoxanil. Apply preventively during cool, wet weather."
  },
  "Potato___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Raspberry___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Soybean___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Squash___Powdery_mildew": {
    organic: "Apply baking soda solution or neem oil spray. Ensure proper plant spacing for airflow.",
    chemical: "Use sulfur-based fungicides or myclobutanil applied at first sign of disease."
  },
  "Strawberry___Leaf_scorch": {
    organic: "Remove infected leaves, avoid overhead watering, apply copper-based fungicides.",
    chemical: "Apply captan or myclobutanil at 10-14 day intervals during spring and fall."
  },
  "Strawberry___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Tomato___Bacterial_spot": {
    organic: "Use copper bactericide sprays. Avoid wetting foliage. Use certified disease-free seeds.",
    chemical: "Apply copper hydroxide combined with mancozeb for better results."
  },
  "Tomato___Early_blight": {
    organic: "Apply neem oil or copper fungicides every 7 days. Stake plants for better airflow.",
    chemical: "Use chlorothalonil, mancozeb, or azoxystrobin at first sign of symptoms."
  },
  "Tomato___Late_blight": {
    organic: "Apply Bordeaux mixture (copper sulfate + lime). Remove and destroy infected tissue.",
    chemical: "Use metalaxyl, cymoxanil, or chlorothalonil. Apply immediately after rainfall."
  },
  "Tomato___Leaf_Mold": {
    organic: "Prune for better air circulation, reduce humidity, apply copper fungicides.",
    chemical: "Apply thiram or mancozeb fungicides. Maintain greenhouse humidity below 85%."
  },
  "Tomato___Septoria_leaf_spot": {
    organic: "Remove infected leaves, mulch soil base, apply copper-based organic fungicide.",
    chemical: "Apply chlorothalonil or mancozeb every 7–10 days during wet weather."
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    organic: "Spray plants with water to dislodge mites. Apply insecticidal soap or neem oil.",
    chemical: "Use miticides such as abamectin or bifenazate. Rotate modes of action."
  },
  "Tomato___Target_Spot": {
    organic: "Remove infected leaves. Apply neem oil or copper-based fungicide.",
    chemical: "Apply azoxystrobin or chlorothalonil at first sign of disease."
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    organic: "Control whitefly vectors with reflective mulch and yellow sticky traps. Remove infected plants.",
    chemical: "Use insecticides to control whiteflies (imidacloprid). No direct cure for the virus."
  },
  "Tomato___Tomato_mosaic_virus": {
    organic: "Remove and destroy infected plants. Wash hands and tools frequently. Avoid smoking near plants.",
    chemical: "No direct chemical cure. Prevent spread by controlling insect vectors and using resistant varieties."
  },
  "Tomato___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },

  // Aliases for duplicate labels
  "Corn_(maize)___Cercospora_leaf_spot": {
    organic: "Rotate crops, use resistant varieties, and improve air circulation.",
    chemical: "Apply strobilurin fungicides at early symptom detection."
  },
  "Corn_(maize)___Common_rust": {
    organic: "Plant resistant hybrids. Remove heavily infected plants.",
    chemical: "Apply triazole fungicides at early tassel stage."
  },
  "Grape___Esca": {
    organic: "Remove and destroy infected wood. Protect pruning wounds.",
    chemical: "Use systemic fungicide injections for management."
  },
  "Grape___Leaf_blight": {
    organic: "Improve air circulation. Apply copper-based fungicides.",
    chemical: "Use captan or mancozeb during wet seasons."
  },
  "Orange___Citrus_Greening": {
    organic: "Remove infected trees. Control the Asian citrus psyllid vector.",
    chemical: "Use systemic insecticides to control psyllid vectors."
  },
  "Peach___Bacterial_spot": {
    organic: "Apply copper-based bactericides in spring.",
    chemical: "Apply oxytetracycline or copper hydroxide from green tip through petal fall."
  },
  "Pepper___Bacterial_spot": {
    organic: "Avoid overhead irrigation, apply copper bactericides.",
    chemical: "Use copper hydroxide combined with crop rotation."
  },
  "Pepper___healthy": { organic: "No treatment needed.", chemical: "No treatment needed." },
  "Strawberry___Leaf_scorch": {
    organic: "Remove infected leaves, avoid overhead watering.",
    chemical: "Apply captan or myclobutanil at 10-14 day intervals."
  }
};

function getCure(disease) {
  if (CURE_DB[disease]) return CURE_DB[disease];
  // fuzzy match
  for (const key of Object.keys(CURE_DB)) {
    if (disease.toLowerCase().includes(key.split('___')[1]?.toLowerCase())) {
      return CURE_DB[key];
    }
  }
  return { organic: "Consult your local agricultural extension office for targeted organic treatments.", chemical: "Consult a licensed agrochemical professional for appropriate treatment." };
}

function formatDiseaseName(rawLabel) {
  const parts = rawLabel.split('___');
  const crop = parts[0].replace(/_/g, ' ');
  const condition = parts[1]?.replace(/_/g, ' ').replace(/\(.*?\)/g, '').trim() || 'Unknown';
  if (condition.toLowerCase() === 'healthy') return `${crop} — Healthy ✅`;
  return `${crop}: ${condition}`;
}

function isHealthy(label) {
  return label.toLowerCase().includes('healthy');
}
