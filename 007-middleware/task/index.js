const express = require("express");

const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/public", express.static(__dirname + "/public"));

app.use("/api/user/login", userRouter);

app.use("/api/books", indexRouter);

app.listen(PORT, "localhost", (err) => {
  err
    ? console.log(err)
    : console.log(`Server is listening on http://localhost:${PORT}`);
});
