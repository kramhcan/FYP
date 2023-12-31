const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import the User_Data model
const User_Data = require("../models/userDataModel");
const User = require("../models/userModel");

// TODO: Function to format userData for prediction
function formatUserData(userData) {
  //Default values
  ca_0 = 0;
  ca_1 = 0;
  ca_2 = 0;
  cp_1 = 0;
  cp_2 = 0;
  cp_3 = 0;
  gender = 0;
  slope_0 = 0;
  slope_1 = 0;
  thal_0 = 0;
  thal_2 = 0;

  // Switch cases for colored_vessels_count and chest_pain_type
  // console.log(userData.colored_vessels_count)
  switch (userData.colored_vessels_count) {
    case 0:
      ca_0 = 1;
      break;
    case 1:
      ca_1 = 1;
      break;
    case 2:
      ca_2 = 1;
      break;
    default:
      break;
  }
  // console.log(userData.chest_pain_type)
  switch (userData.chest_pain_type) {
    case 1:
      cp_1 = 1;
      break;
    case 2:
      cp_2 = 1;
      break;
    case 3:
      cp_3 = 1;
      break;
    default:
      break;
  }
  // console.log(userData.gender)
  switch (userData.gender) {
    case "male":
      gender = 1;
      break;
    case "female":
      gender = 0;
      break;
    default:
      break;
  }
  // console.log(userData.slope)
  switch (userData.slope) {
    case 0:
      slope_0 = 1;
      break;
    case 1:
      slope_1 = 1;
      break;
    default:
      break;
  }
  // console.log(userData.thal)
  switch (userData.thal) {
    case 0:
      thal_0  = 1;
      break;
    case 2:
      thal_2 = 1;
      break;
    default:
      break;
  }
  

  const formattedUserData = {
    age: Number(userData.age),
    ca_0: ca_0,
    ca_1: ca_1,
    ca_2: ca_2,
    cp_1: cp_1,
    cp_2: cp_2,
    cp_3: cp_3,
    exang: userData.exercise_angina,
    oldpeak: userData.oldpeak,
    sex: gender,
    slope_0: slope_0,
    slope_1: slope_1,
    thal_0: thal_0,
    thal_2: thal_2,
    thalach: userData.thalach

  }
  return formattedUserData;
}

// Insert user data route
router.post("/insert", async (req, res) => {
  userData = req.body;
  try {
    const newUserData = new User_Data(userData);
    await newUserData.save();
    res.status(201).json({
      message: "User data saved successfully",
      user: newUserData,
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      // duplicate key error
      res.status(409).json({ message: "Record already exists" });
    } else {
      // This is a different type of error
      res.status(500).json({ message: error.message });
    }
  }
});

// view single user data route
router.get("/view", async (req, res) => {
  try {
    const userData = await User.aggregate([
      {
        $lookup: {
          from: "user_datas",
          localField: "email",
          foreignField: "user_email",
          as: "user_data",
        },
      },
      { $unwind: "$user_data" },
      { $match: { email: req.query.email } },
    ]);
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users route
router.get("/view_all", async (req, res) => {
  try {
    const userData = await User.aggregate([
      {
        $lookup: {
          from: "user_datas",
          localField: "email",
          foreignField: "user_email",
          as: "user_data",
        },
      },
      { $unwind: "$user_data" },
    ]);
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// prediction route
router.get("/predict/:input", async (req, res) => {
  try {
    const email = req.params.input;
    try{
      const userData = await User_Data.find({ user_email: email }).sort({ _id: -1 }).limit(1);
      fUserData = formatUserData(userData[0]);
      console.log("Formated User Data :::", fUserData);
      try{
        const response = await axios.post(
          "http://127.0.0.1:5000/predict",
          fUserData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        res.status(200).json({
          data: fUserData,
          response: response.data
        });
      } catch (error) {
        res.status(500).json({ 
          message: "Internal server error",
          error: error.message
        });
      }
      // res.status(200).json({ userData });
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error",
        location: "second try",
        error: error.message 
      });
    }
    // res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Internal server error",
      location: "first try",
      error: error.message 
    });
  }
});

// Update user data route
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User_Data.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
});

module.exports = router;
