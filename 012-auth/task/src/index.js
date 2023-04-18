const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const privatePage = require("./middlewares/privatePage");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const verify = async (login, password, done) => {
  try {
    const user = await User.findOne({ login: login });
    if (password === user.password) {
      done(null, user);
    } else {
      done(null, false, { message: "Пароль не правильный" });
    }
  } catch {
    done(null, false, { message: "Имя пользователя введено не верно" });
  }
};

const options = {
  usernameField: "login",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/public", express.static(__dirname + "/public"));

app.use("/user", userRouter);

app.use("/", privatePage, indexRouter);

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
