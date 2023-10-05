const express = require('express');
const app = express();
const tf = require('@tensorflow/tfjs');
const model = tf.sequential();
const modelDir = '../Jupyter/my_model.pkl' // path to model directory

const saveResult = model.save('file://${modelDir}');

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Login route
app.post('/login', (req, res) => {
  res.send('Hello World!');
});

// Register route
app.post('/register', (req, res) => {
  res.send('Hello World!');
})

//TODO: MongoDB integration and connection

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});