const BACKEND_URL = "https://your-backend-name.onrender.com";

async function uploadImage() {
    let file = document.getElementById("imageInput").files[0];
    let formData = new FormData();
    formData.append("file", file);

    let response = await fetch(`${BACKEND_URL}/predict_disease/`, {
        method: "POST",
        body: formData
    });

    let data = await response.json();
    document.getElementById("result").innerHTML = JSON.stringify(data, null, 2);
}

async function predictRisk() {
    let formData = new FormData();
    formData.append("crop", document.getElementById("crop").value);
    formData.append("temperature", document.getElementById("temp").value);
    formData.append("humidity", document.getElementById("humidity").value);
    formData.append("rainfall", document.getElementById("rainfall").value);

    let response = await fetch(`${BACKEND_URL}/predict_risk/`, {
        method: "POST",
        body: formData
    });

    let data = await response.json();
    document.getElementById("result").innerHTML = JSON.stringify(data, null, 2);
}
