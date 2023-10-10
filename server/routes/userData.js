const express = require("express");
const router = express.Router();

// Import the User_Data model
const User_Data = require("../models/userDataModel");
const User = require("../models/userModel");

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

module.exports = router;
