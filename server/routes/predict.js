const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/predict", async (req, res) => {
    try {
        const data = {
            input: req.body.input // assuming the input is an array
        };
        const response = await axios.post("http://127.0.0.1:5000/predict", data); // replace with your Flask server URL
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

