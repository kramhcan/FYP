const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true,
      unique: true
    },
    chest_pain_type: {
      type: String,
      required: true,
      unique: true
    },
    colored_vessels_count: {
      type: Number,
      required: true,
      unique: true
    },
    exercise_angina: {
      type: Boolean,
      required: true,
      unique: true
    },
    oldpeak: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
  });

const User = mongoose.model('User_Data', userDataSchema);

module.exports = User;