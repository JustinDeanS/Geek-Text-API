const express = require('express');
const router = express.Router();
const User = require('../models/user');

//creates a new user
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send("User created.");
    } catch (err) {
        res.status(400).send(err);
    }
});

//gets user info
router.get("/:username", async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.params.username });
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//updates user info
router.put("/:username", async (req, res) => {
    try {
        if (req.body.email) {
            delete req.body.email;
        }
        await User.updateOne({ username: req.params.username }, { $set: req.body });
        res.status(200).send("User updated.");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
