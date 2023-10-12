require('dotenv').config();
const express = require('express')
const app = express()
const BookModel = require('./models/BookModel')
const mongoose = require('mongoose')
const bookRoutes = require('./routes/bookRoutes');
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.use(bookRoutes);    // Use routes from bookRoutes

    app.listen(3000, () => {
        console.log('Node API App is running on port 3000')
    
    })
    console.log('connected to database')



}).catch((error) => {
    console.log(error)
})