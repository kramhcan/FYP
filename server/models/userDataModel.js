const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    user_email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    chest_pain_type: {
      type: Number,
      required: true,
    },
    colored_vessels_count: {
      type: Number,
      required: true,
    },
    exercise_angina: {
      type: Number,
      required: true,
    },
    oldpeak: {
      type: Number,
      required: true,
    },
    slope: {
      type: Number,
      required: true,
    },
    thal: {
      type: Number,
      required: true,
    },
    thalach: {
      type: Number,
      required: true,
    },
  });

const User_Data = mongoose.model('User_Data', userDataSchema);

module.exports = User_Data;