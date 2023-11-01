const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    homeAddress: String
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
