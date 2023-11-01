const express = require('express');
const router = express.Router();
const CreditCard = require('../models/creditCard');
const User = require('../models/user');

//creates a creditcard for an existing user
router.post("/", async (req, res) => {
    const { username, cardNumber, expirationDate, cvv } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(400).send("User not found."); //send if user doesn't exist
    }
    const newCreditCard = new CreditCard({ username, cardNumber, expirationDate, cvv });
    try {
        await newCreditCard.save();
        res.status(201).send("Credit card created.");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
