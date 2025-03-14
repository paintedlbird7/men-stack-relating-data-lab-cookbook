const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: []
    // enum: ['fresh', 'past due', 'throw out', 'need more', 'donate'],
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantries: [foodSchema], // Embedded schema as an array
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
