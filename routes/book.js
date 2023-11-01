const express = require("express");
const router = express.Router();
const Book = require("../models/book.js");
const mongoose = require("mongoose"); // Import Mongoose
const { Types } = mongoose; // Import Types from Mongoose

// creates a book
router.post("/createBook", async (req, res) => {
  const authorID = req.body.authorID; // Get authorID from the request body

  // Check if the author with the provided authorID exists
  // You need to add this validation logic on the client side.

  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new book" });
  }
});

////creates a book
// router.post("/createBook", async (req, res) => {
//   try {
//     const newBook = await Book.create(req.body);
//     // console.log("BOOK created:", newBook);
//     res.status(201).json(newBook);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create a new book" });
//   }
// });

// router.post("/createBook", async (req, res) => {
//   try {
//     const newBook = await Book.create(req.body);
//     // console.log("BOOK created:", newBook);
//     res.status(201).json(newBook);
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).json({ error: error.message }); // Return the error message in the response
//   }
// });

//retrieves book details by ISBN
router.get("/books/:ISBN", async (req, res) => {
  const ISBN = req.params.ISBN;
  // console.log("book ISBN:", ISBN);

  try {
    const book = await Book.findOne({ ISBN });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve book details" });
  }
});

module.exports = router;
