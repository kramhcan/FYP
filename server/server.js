const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: "*"
}));

//TODO: MongoDB integration and connection
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRoute = require("./routes/user");
const userDataRoute = require("./routes/userData");

app.use("/user", userRoute);
app.use("/user_data", userDataRoute);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// app.get("/drop", async (req, res) => {
//   // Drop the user collection
//   User.collection.drop()
//     .then(() => {
//       res.send("User collection dropped");
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// });

// Unknown route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
const HOST = '0.0.0.0'
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
  console.log(`Server is running on https://${HOST}:${PORT}`);
});
