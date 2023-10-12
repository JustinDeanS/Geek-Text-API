// routes/bookRoutes.js
const express = require('express');
const BookModel = require('../models/BookModel'); 

const router = express.Router();



router.get('/bookstore', (req, res) => {
    res.send("Bookstore Coming soon")
    
})


router.get('/books/Rating/:rating', async (req, res) => {
    try {
        const rating = req.params.rating;
        let books = await BookModel.find({ rating: { $gte: rating } });

        if (!books || books.length === 0 || rating < 1) {
            return res.status(404).json({ Error: `Cannot find any books, or invalid rating stated: ${rating}` });
        }

        books = books.sort((a, b) => a.rating - b.rating);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





router.get('/books/genre/:genre', async(req,res) => {
    try{
        const genre= req.params.genre;
        const books = await BookModel.find({genre: genre})
        if (!books || books.length === 0){
            return res.status(404).json({Error: `cannot find any books with Genre: ${genre}`})

        }
        res.status(200).json(books)
        


    } catch(error){
        res.status(500).json({message: error.message})

    }
})



router.get('/books', async(req,res) => {
        try{
            const books = await BookModel.find({})
            res.status(200).json(books)
            
        } catch(error){
            res.status(500).json({message: error.message})

        }
})


router.get('/books/Publishers/:publisher', async(req,res) =>{
    try{
        const publishers = req.params.publisher;
        const books = await BookModel.find({publisher: publishers});
        if (!books || books.length === 0){
            return res.status(404).json({Error: `cannot find any books with publisher: ${publishers}`})

        }
        
        res.status(200).json(books)
    } catch(error){
        res.status(500).json({message: error.message})
    }
    })


router.get('/books/:id', async(req,res) =>{
try{
    const {id} = req.params;
    const book = await BookModel.findById(id);
    res.status(200).json(book)
} catch(error){
    res.status(500).json({message: error.message})
}
})


router.put('/Discount/:Publisher/:Discount', async(req, res) => {
    try{
        const publisher = req.params.Publisher;
        const discount = req.params.Discount;
        const books = await BookModel.find({publisher: publisher})
        //cannot find books in database with specified publisher
        if (!books || books.length === 0){
            return res.status(404).json({message: `cannot find any publisher with name ${publisher}`})
        }
        
        
        for (const book of books){
            book.price *= 1 - discount / 100;
            book.price = parseFloat(book.price.toFixed(2));
            await book.save();
        }
        
        const updatedBooks = await BookModel.find({publisher: publisher});

        res.status(200).json({
            message: `Discount applied to books with publisher: ${publisher}`,
            updatedBooks: updatedBooks,



        });

    } catch(error){
        res.status(500).json({message: error.message})
    }
})


router.put('/books/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const book = await BookModel.findByIdAndUpdate(id,req.body)
        //cannot find product in database
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        const updatedProduct = await BookModel.findById(id);
        res.status(200).json(updatedProduct);

    } catch(error){
        res.status(500).json({message: error.message})
    }
})



router.post('/books', async(req, res) => {
try {
const addBook = await BookModel.create(req.body)
res.status(200).json(addBook);

}catch (error){
    console.log(error.message);
    res.status(500).json({message: error.message})
}
})


router.delete('/books/:id', async(req,res) => {
    try{
        const {id} = req.params;
        
        const books = await BookModel.findByIdAndDelete(id);
        if (!books){
            return res.status(404).json({message: `cannot find any book with ID: ${id}`})
        }
        res.status(200).json(books);

    } catch (error){
        res.status(500).json({message: error.message})

    }
})


module.exports = router;