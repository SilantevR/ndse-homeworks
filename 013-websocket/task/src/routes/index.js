const express = require("express");
const path = require("path");
const http = require("http");
const Book = require("../models/book");
const fileMulter = require("../middlewares/books");
const coverMulter = require("../middlewares/covers");

const router = express.Router();

const URL = process.env.URL || "http://localhost:4000/";

function httpGet(URL) {
  return new Promise((resolve, reject) => {
    http
      .get(URL, (res) => {
        let rowData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (rowData += chunk));
        res.on("end", () => {
          resolve(JSON.parse(rowData));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function httpPost(postOptions) {
  return new Promise((resolve, reject) => {
    const postRequest = http.request(postOptions, (response) => {
      response.setEncoding("utf8");
      response.on("data", (data) => {
        resolve(JSON.parse(data));
      });
    });

    postRequest.on("error", (err) => {
      reject(err);
    });

    postRequest.end();
  });
}

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("./index", { title: "Главная", books: books });
});

router.get("/add", (req, res) => {
  res.render("./pages/create", {
    title: "Добавить книгу",
    book: {},
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postOptions = {
    hostname: process.env.SERVICE || "localhost",
    port: "4000",
    path: `/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let obj;
  try {
    obj = await httpPost(postOptions);
  } catch {
    obj = { id, count: "Данные о просмотрах не найдены" };
  }

  try {
    const book = await Book.findById(id);
    res.render("./pages/view", {
      title: book.title,
      book: book,
      count: obj.count,
    });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/add", async (req, res) => {
  const book = await Book.create(req.body);

  res.redirect(301, "http://localhost:3000" + `/update/${book.id}`);
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    res.render("./pages/update", {
      title: book.title,
      book: book,
    });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/file/:id", fileMulter.single("fileBook"), async (req, res) => {
  const { id } = req.params;
  const bookURL = URL + id;
  if (req.file) {
    const { filename } = req.file;
    try {
      await Book.findByIdAndUpdate(id, { fileName: filename });
      const book = await Book.findById(id);

      let obj;
      try {
        obj = await httpGet(bookURL);
      } catch {
        obj = { id, count: "Данные о просмотрах не найдены" };
      }
      if (!obj) {
        obj = { id, count: "Данные о просмотрах не найдены" };
      }
      res.render("./pages/view", {
        title: book.title,
        book: book,
        count: obj.count,
      });
    } catch {
      res.render("./pages/404", {
        title: "Ошибка 404",
      });
    }
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/cover/:id", coverMulter.single("fileCover"), async (req, res) => {
  const { id } = req.params;

  const bookURL = URL + id;
  if (req.file) {
    const { filename } = req.file;
    try {
      await Book.findByIdAndUpdate(id, { fileCover: filename });
      const book = await Book.findById(id);

      let obj;
      try {
        obj = await httpGet(bookURL);
      } catch {
        obj = { id, count: "Данные о просмотрах не найдены" };
      }
      if (!obj) {
        obj = { id, count: "Данные о просмотрах не найдены" };
      }
      res.render("./pages/view", {
        title: book.title,
        book: book,
        count: obj.count,
      });
    } catch {
      res.render("./pages/404", {
        title: "Ошибка 404",
      });
    }
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.get("/download/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    const { fileName } = book;
    const file = path.join(__dirname, `../public/books/${fileName}`);
    res.download(file);
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const bookURL = URL + id;
  let obj;
  try {
    obj = await httpGet(bookURL);
  } catch {
    obj = { id, count: "Данные о просмотрах не найдены" };
  }
  try {
    await Book.findByIdAndUpdate(id, req.body);
    const book = await Book.findById(id);
    res.render("./pages/view", {
      title: book.title,
      book: book,
      count: obj.count,
    });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  //const index = store.books.findIndex((el) => el.id === id);
  try {
    await Book.findByIdAndDelete(id, req.body);
    const books = await Book.find();
    res.render("./index", { title: "Главная", books });
  } catch {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

module.exports = router;
