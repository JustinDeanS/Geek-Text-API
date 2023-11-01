const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book.js");

//creates an author
router.post("/createAuthor", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    const authorName = `${req.body.firstName} ${req.body.lastName}`;

    const books = await Book.find({ author: authorName });
    if (books.length > 0) {
      books.forEach(async (book) => {
        book.author = newAuthor._id;
        await book.save();
      });
    }

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new author" });
  }
});

//retrieves books associated with an author
router.get("/:AuthorId/books", async (req, res) => {
  const AuthorId = req.params.AuthorId;

  try {
    const author = await Author.findById(AuthorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const books = await Book.find({ author: AuthorId }).select("title");

    if (books.length === 0) {
      return res.status(404).json({ error: "No books found for this author" });
    }

    const bookTitles = books.map((book) => book.title);
    res.json(bookTitles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
