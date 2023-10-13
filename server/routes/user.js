const express = require("express");
const router = express.Router();

//Import the User model
const User = require("../models/userModel");

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register route
router.post("/register", async (req, res) => {
  userData = req.body;
  try {
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      // duplicate key error
      res.status(409).json({ message: "Email already exists" });
    } else {
      // This is a different type of error
      res.status(500).json({ message: error.message });
    }
  }
});

// Get all users route
router.get("/list", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO: Update & Delete

module.exports = router;
