const express = require("express");
const app = express();
require("dotenv").config();

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
app.get("/", (req, res) => {
  // Insert the user into the database
  user.save()
    .then(() => {
      res.send("User saved to database");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get("/drop", (req, res) => {
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
app.post("/login", (req, res) => {
  res.send("Hello World!");
});

// Register route
app.post("/register", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
