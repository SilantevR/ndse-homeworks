const { v4: uuid } = require("uuid");
const express = require("express");
const path = require("path");
const http = require("http");
const fileMulter = require("../middlewares/books");
const coverMulter = require("../middlewares/covers");
const router = express.Router();

const URL = process.env.URL

class Book {
  constructor(body) {
    this.id = body.id || uuid();
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
      id: "1214315hjkhk21351",
      title: "Убийство",
      description: "Детектив",
      authors: "Kein",
      favorite: true,
      fileName: "не загружено",
    }),
    new Book({
      id: "1214315hjkhk21352",
      title: "Приключение",
      description: "Детектив",
      authors: "Kein",
      favorite: true,
      fileName: "не загружено",
    }),
  ],
};

function httpGet (URL){
  return new Promise ((resolve, reject) => {
  http.get(URL, (res) => {
    let rowData = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => (rowData += chunk));
    res.on("end", () => {
    resolve(JSON.parse(rowData));
    }).on("error", (err) => {
      reject(err)
    });
  })
  })
}

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

router.get("/:id", async(req, res) => {
  const { id } = req.params;
  const bookURL = URL + id;
  const postOptions = {
    hostname: 'counter',
    port    : '4000',
    path    : `/${id}`,
    method  : 'POST',
    headers: {
      'Content-Type': 'application/json'
   },
  };
  
  const postRequest = http.request(postOptions, (response) => {
      response.setEncoding('utf8');
  })

  postRequest.on("error", (err) => {
      console.log(err)
  });
   
  postRequest.end();


  let obj = await httpGet(bookURL)
  const { books } = store;
  const index = books.findIndex((el) => el.id === id);
  if (index !== -1) {
    res.render("./pages/view", {
      title: books[index].title,
      book: books[index],
      count: obj.count,
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

/*router.post("/counter/:id/incr", (req, res) => {
  const { id } = req.params;
  
  res.redirect(301, "http://localhost:3000" + `/${id}`);
  
});*/

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

router.post("/file/:id", fileMulter.single("fileBook"), async(req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1 && req.file) {
    const { filename } = req.file;
    store.books[index] = {
      ...store.books[index],
      fileName: filename,
    };
    const bookURL = URL + id;
    const obj = await httpGet(bookURL)
    res.render("./pages/view", {
      title: store.books[index].title,
      book: store.books[index],
      count: obj.count
    });
  } else {
    res.render("./pages/404", {
      title: "Ошибка 404",
    });
  }
});

router.post("/cover/:id", coverMulter.single("fileCover"), async(req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);
  if (index !== -1 && req.file) {
    const { filename } = req.file;
    store.books[index] = {
      ...store.books[index],
      fileCover: filename,
    };
    const bookURL = URL + id;
    const obj = await httpGet(bookURL)
    res.render("./pages/view", {
      title: store.books[index].title,
      book: store.books[index],
      count: obj.count
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

router.post("/update/:id", async(req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex((el) => el.id === id);

  if (index !== -1) {
    store.books[index] = {
      ...store.books[index],
      ...req.body,
    };
    const bookURL = URL + id;
    const obj = await httpGet(bookURL)
    res.render("./pages/view", {
      title: store.books[index].title,
      book: store.books[index],
      count: obj.count
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
