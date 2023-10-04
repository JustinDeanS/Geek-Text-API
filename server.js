const express = require("express");
const mongoose = require("mongoose");
const booksRouter = require("./routes/book.js");
const authorsRouter = require("./routes/author.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.idqgcum.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());

app.use("/api/", booksRouter);
app.use("/api/", authorsRouter);

//health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

app.get("/", (req, res) => {
  res.send({ isitworking: "yesitis" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.use((req, res, next) => {
  return next(new NotFoundError());
});

//generic error handler; anything unhandled goes here
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  console.log(err);

  return res.status(status).json({
    error: { message, status },
  });
});

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`🚀🚀Server is running on port ${port}`);
});
