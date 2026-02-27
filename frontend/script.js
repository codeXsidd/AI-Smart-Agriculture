async function uploadImage() {
    let file = document.getElementById("imageInput").files[0];
    let formData = new FormData();
    formData.append("file", file);

    let response = await fetch("http://127.0.0.1:8000/predict_disease/", {
        method: "POST",
        body: formData
    });

    let data = await response.json();
    document.getElementById("result").innerHTML = JSON.stringify(data);
}

async function predictRisk() {
    let crop = document.getElementById("crop").value;
    let temp = document.getElementById("temp").value;
    let humidity = document.getElementById("humidity").value;
    let rainfall = document.getElementById("rainfall").value;

    let response = await fetch(`http://127.0.0.1:8000/predict_risk/?crop=${crop}&temperature=${temp}&humidity=${humidity}&rainfall=${rainfall}`, {
        method: "POST"
    });

    let data = await response.json();
    document.getElementById("result").innerHTML = JSON.stringify(data);
}
