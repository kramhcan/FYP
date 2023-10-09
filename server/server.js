const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

//TODO: MongoDB integration and connection
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import the User model
const User = require("./models/userModel");

// Testing the User model
const user = new User({
  name: 'Jane Doe',
  dob: '01-01-2000',
  email: 'janedoe@email.com',
  password: 'password',
  phone: 1234567890,
  role: 'student'
});

// Define a route
app.get("/", async (req, res) => {
  // Insert the user into the database
  res.send("Hello World!");
});

app.get("/drop", async (req, res) => {
  // Drop the user collection
  User.collection.drop()
    .then(() => {
      res.send("User collection dropped");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Login route
app.post("/login", async (req, res) => {
  res.send("Hello World!");
});

// Register route
app.post("/register", async (req, res) => {
  userData = req.body;
  try{
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      // This is a duplicate key error
      res.status(409).json({ message: "Email already exists" });
    } else {
      // This is a different type of error
      res.status(500).json({ message: error.message });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
