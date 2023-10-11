const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const creditCardRoutes = require('./routes/creditCardRoutes');

//server connection
mongoose.connect('mongodb://127.0.0.1:27017/profile', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/user', userRoutes);
app.use('/creditCard', creditCardRoutes);

app.listen(3000, () => {
    console.log("Server successfully started");
});
