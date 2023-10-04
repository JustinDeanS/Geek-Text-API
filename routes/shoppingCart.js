const express = require('express')
const router = express.Router()
const shoppingCart = require('../models/shoppingCart')

// GET all Books
// router.get('/', async (req, res) => {
//     try {

//         const shopping = await shoppingCart.find()
//         res.json(shopping)

//     } catch (err) {

//         res.status(500).json({ message: err.message })

//     }

// })

// Get the subtotal
router.get('/', async (req, res) => {
    try {
        const shopping = await shoppingCart.find();
        
        // Calculate the total price
        let totalPrice = 0;
        for (const item of shopping) {
            totalPrice += item.price;
        }

        // Add the total price to the response JSON
        const response = {
            shopping,
            totalPrice
        };

        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one Book
router.get('/:id', getCart, (req, res) => {
    res.send(res.cart)

})

// CREATE one Book
router.post('/', async (req, res) => {

    const cart = new shoppingCart ({

        bookId: req.body.bookId,
        price: req.body.price

    })

    try {

        const newCart = await cart.save()
        res.status(201).json(newCart)

    } catch (err){

        res.status(400).json({message: err.message})

    }

})


// Delete one Book
router.delete('/:id', getCart, async (req, res) => {
    
    try{

        //await res.cart.deleteOne()
        const cartItem = res.cart;

        // Remove the item from the cart
        await cartItem.deleteOne();
        res.json({ message: 'Book removed from cart'})

    } catch(err){

        res.status(500).json({ message: err.message })

    }

})

//middleware
async function getCart(req, res, next){

    try {

        cart = await shoppingCart.findById(req.params.id)
        if(cart == null){
            return res.status(404).json({ message: 'Cannot find Book'})
        }

    } catch (err){
        return res.status(500).json({ message: err.message })
    }

    res.cart = cart
    next()

}

module.exports = router