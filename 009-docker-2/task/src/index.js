const express = require("express");
const path = require("path")

const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.use("/public", express.static(__dirname + "/public"));

app.use("/api/user/login", userRouter);

app.use("/", indexRouter);

app.listen(PORT, "0.0.0.0", (err) => {
  err
    ? console.log(err)
    : console.log(`Server is listening on http://localhost:${PORT}`);
});
