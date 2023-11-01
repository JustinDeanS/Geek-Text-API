const express = require("express");
const router = express.Router();
const Book = require("../models/book.js");
const mongoose = require("mongoose");
const { Types } = mongoose;

// creates a book
router.post("/createBook", async (req, res) => {
  const authorID = req.body.authorID;
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new book" });
  }
});

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
