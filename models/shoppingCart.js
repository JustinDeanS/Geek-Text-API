const mongoose = require('mongoose')

const shoppingCartSchema = new mongoose.Schema({

    bookId: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }

})

module.exports = mongoose.model('shoppingCart', shoppingCartSchema)