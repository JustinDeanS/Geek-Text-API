const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
    username: String,
    cardNumber: String,
    expirationDate: String,
    cvv: Number
  });

const CreditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = CreditCard;