// Auto-generated from sklearn RandomForest model
// Crops: ["Potato", "Rice", "Tomato", "Wheat"]
// Diseases: ["Fungal Disease", "Late Blight", "Low Risk"]

const RISK_CROPS = ["Potato", "Rice", "Tomato", "Wheat"];

const RISK_TABLE = {
  "Potato": [
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 93
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 91
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 96
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 94
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 96
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 96
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    }
  ],
  "Rice": [
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 93
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 91
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 96
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 94
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 96
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 96
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    }
  ],
  "Tomato": [
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 93
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 91
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 95
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 98
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 93
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 97
    }
  ],
  "Wheat": [
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 93
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 91
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 92
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 96
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 97
    },
    {
      "t_lo": 5,
      "t_hi": 15,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Late Blight",
      "risk": 90
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Late Blight",
      "risk": 96
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Late Blight",
      "risk": 97
    },
    {
      "t_lo": 15,
      "t_hi": 25,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Late Blight",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 100
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 25,
      "t_hi": 35,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 30,
      "h_hi": 50,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 50,
      "h_hi": 70,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 97
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 70,
      "h_hi": 90,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 0,
      "r_hi": 10,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 10,
      "r_hi": 50,
      "disease": "Low Risk",
      "risk": 99
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 50,
      "r_hi": 100,
      "disease": "Low Risk",
      "risk": 98
    },
    {
      "t_lo": 35,
      "t_hi": 45,
      "h_lo": 90,
      "h_hi": 100,
      "r_lo": 100,
      "r_hi": 200,
      "disease": "Low Risk",
      "risk": 97
    }
  ]
};


function predictRiskJS(crop, temperature, humidity, rainfall) {
    const table = RISK_TABLE[crop];
    if (!table) return { error: "Crop not supported" };

    let best = null;
    for (const row of table) {
        const inTemp = temperature >= row.t_lo && temperature <= row.t_hi;
        const inHum  = humidity   >= row.h_lo && humidity   <= row.h_hi;
        const inRain = rainfall   >= row.r_lo && rainfall   <= row.r_hi;
        if (inTemp && inHum && inRain) {
            best = row;
            break;
        }
    }

    // Fall back: find closest match
    if (!best) {
        let minDist = Infinity;
        for (const row of table) {
            const tc = (row.t_lo + row.t_hi) / 2;
            const hc = (row.h_lo + row.h_hi) / 2;
            const rc = (row.r_lo + row.r_hi) / 2;
            const dist = Math.abs(temperature - tc) + Math.abs(humidity - hc) + Math.abs(rainfall - rc) / 5;
            if (dist < minDist) { minDist = dist; best = row; }
        }
    }

    return {
        risk_percentage: best.risk,
        predicted_disease: best.disease,
        message: `${crop} has ${best.risk}% risk of ${best.disease}`
    };
}
