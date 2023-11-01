const express = require('express')
const router = express.Router()
const ShoppingCart = require('../models/shoppingCart')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// GET all Books in the user's shopping cart
router.get('/retrieve/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;

        const newUser = await User.findOne({ userId: req.params.userId });
        
        if (!newUser) {
            
            return res.status(404).json({ message: 'User not found' });

        }

        let newShoppingCart = await ShoppingCart.findOne({ user: userId });

        if (!newShoppingCart) {
             
            return res.status(404).json({ message: 'Shopping Cart not found' });

        }
        else{

            res.status(201).json(newShoppingCart);

        }

    } catch (err) {

        res.status(500).json({ message: err.message })

    }

})

//Get the subtotal
router.get('/subtotal/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;
        const shoppingCart = await ShoppingCart.findOne({ user: userId });

    if (!shoppingCart) {
      console.log('Shopping cart not found');
      return;
    }

    const subtotal = shoppingCart.books.reduce((total, books) => total + books.price, 0);

        const response = {
            subtotal
        };

        res.json(response);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a Book to the shopping cart
router.post('/Add/:userId/:bookId', async (req, res) => {

    try {

        const userId = req.params.userId;
        const bookId = req.params.bookId;

        const { price } = req.body;

        const newUser = await User.findOne({ userId: req.params.userId });
        if (!newUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        let newShoppingCart = await ShoppingCart.findOne({ user: userId });

        if (!newShoppingCart) {
             newShoppingCart = new ShoppingCart({ 
                
                user: userId, 
                books: [{bookId, price: price }],

            });
        
        await newShoppingCart.save();
        }
        else{

            newShoppingCart.books.push({  bookId, price: price });
            await newShoppingCart.save();

        }
    
        res.status(201).json(newShoppingCart);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

});

// Delete one Book
router.delete('/Delete/:userId/:bookId', async (req, res) => {
    
    try{

        const userId = req.params.userId;
        const bookId = req.params.bookId;

        const newUser = await User.findOne({ userId: req.params.userId });
        
        if (!newUser) {
            
            return res.status(404).json({ message: 'User not found' });

        }

        let newShoppingCart = await ShoppingCart.findOne({ user: userId });

        if (!newShoppingCart) {
             
            return res.status(404).json({ message: 'Shopping Cart not found' });

        }
        else{

            const updatedCart = await ShoppingCart.findOneAndUpdate(
                { user: userId },
                { $pull: { books: { bookId: bookId } } },
                { new: true }
              ).exec();
            
            res.status(201).json(updatedCart);

        }

    } catch(err){

        res.status(500).json({ message: err.message })

    }

})

//remove later
//Route to create a user with a specific user ID
router.post('/:userId', async (req, res) => {
    try {
      
      const { userId, bookId, shoppingCart} = req.body;
      // Create a new user
      const newUser = new User({userId, bookId, shoppingCart});
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router