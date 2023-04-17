const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/public", express.static(__dirname + "/public"));

app.use("/api/user/login", userRouter);

app.use("/", indexRouter);

const baseURL = process.env.MONGODB_URL || `mongodb://localhost:27017/booksbox`;

mongoose
  .connect(baseURL)
  .then((res) => {
    console.log("conected to mongoDB");
    app.listen(PORT, "0.0.0.0", (err) => {
      err
        ? console.log(err)
        : console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Conection failed: ${err}`);
  });
