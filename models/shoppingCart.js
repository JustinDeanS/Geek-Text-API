const mongoose = require('mongoose')

const shoppingCartSchema = new mongoose.Schema({

    user: {
        type: String,
        ref: 'User',
        require: true
    },

    books: [
        {
            bookId: {
                type: String,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        
        }
    ]

})

const ShoppingCart = mongoose.model('shoppingCart', shoppingCartSchema)

module.exports = ShoppingCart;