const { v4: uuid } = require("uuid");
const express = require("express");
const fileMulter = require("../middlewares/books");
const router = express.Router();

class Book {
  constructor(body) {
    this.id = uuid();
    this.title = body.title || "";
    this.description = body.description || "";
    this.authors = body.authors || "";
    this.favorite = body.favorite || "";
    this.fileCover = body.fileCover || "";
    this.fileName = body.fileName || "";
  }
}

const store = {
  books: [new Book({}), new Book({})],
};

const err404 = { error: 404, reason: "Страница не найдена" };

router.get("/", (req, res) => {
  const { books } = store;
  res.json(books);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { books } = store;
  const index = books.findIndex((el) => el.id === id);
  if (index !== -1) {
    res.json(books[index]);
  } else {
    res.status(404);
    res.json(err404);
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  const book = new Book(req.body);

  store.books.push(book);

  res.status(201);
  res.json(book);
});

router.post("/:id", fileMulter.single("book"), (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1 && req.file) {
    const { filename } = req.file;
    store.books[index] = {
      ...store.books[index],
      fileName: filename,
    };
    res.json(store.books[index]);
  } else {
    res.status(404);
    res.json(err404);
  }
});

router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1) {
    const { fileName } = store.books[index];
    res.redirect(301, "http://localhost:3000" + `/public/books/${fileName}`);
  } else {
    res.status(404);
    res.json(err404);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);

  if (index !== -1) {
    store.books[index] = {
      ...store.books[index],
      ...req.body,
    };

    res.json(store.books[index]);
  } else {
    res.status(404);
    res.json(err404);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);

  if (index !== -1) {
    store.books.splice(index, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json(err404);
  }
});

module.exports = router;
