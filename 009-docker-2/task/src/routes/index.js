const { v4: uuid } = require("uuid");
const express = require("express");
const path = require("path");
const fileMulter = require("../middlewares/books");
const coverMulter = require("../middlewares/covers");
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
  books: [
    new Book({
      title: "Убийство",
      description: "Детектив",
      authors: "Kein",
      favorite: true,
      fileName: "не загружено",
    }),
    new Book({}),
  ],
};

const err404 = { error: 404, reason: "Страница не найдена" };

router.get("/", (req, res) => {
  const { books } = store;
  res.render("./index", { title: "Главная", books: books });
});

router.get("/add", (req, res) => {
  res.render("./pages/create", {
    title: "Добавить книгу",
    book: {},
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { books } = store;
  const index = books.findIndex((el) => el.id === id);
  if (index !== -1) {
    res.render("./pages/view", {
      title: books[index].title,
      book: books[index],
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/add", (req, res) => {
  const book = new Book(req.body);

  store.books.push(book);

  res.redirect(301, "http://localhost:3000" + `/update/${book.id}`);
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  const { books } = store;
  const index = books.findIndex((el) => el.id === id);
  if (index !== -1) {
    res.render("./pages/update", {
      title: books[index].title,
      book: books[index],
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/file/:id", fileMulter.single("fileBook"), (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1 && req.file) {
    const { filename } = req.file;
    store.books[index] = {
      ...store.books[index],
      fileName: filename,
    };
    res.render("./pages/view", {
      title: store.books[index].title,
      book: store.books[index],
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/cover/:id", coverMulter.single("fileCover"), (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1 && req.file) {
    const { filename } = req.file;
    store.books[index] = {
      ...store.books[index],
      fileCover: filename,
    };
    res.render("./pages/view", {
      title: store.books[index].title,
      book: store.books[index],
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.get("/download/:id", (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1) {
    const { fileName } = store.books[index];
    //res.redirect(301, "http://localhost:3000" + `/public/books/${fileName}`);
    const file = path.join(__dirname, `../public/books/${fileName}`);
    res.download(file);
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);

  if (index !== -1) {
    store.books[index] = {
      ...store.books[index],
      ...req.body,
    };
    res.render("./pages/view", {
      title: store.books[index].title,
      book: store.books[index],
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);

  if (index !== -1) {
    store.books.splice(index, 1);
    res.render("./index", { title: "Главная", books: store.books });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

module.exports = router;
