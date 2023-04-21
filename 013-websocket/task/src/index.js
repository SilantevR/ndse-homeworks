const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const Book = require("./models/book");
const privatePage = require("./middlewares/privatePage");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", async (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);
  let book = await Book.findById(socket.handshake.query.roomName);
  socket.emit("show-comments", book.comments);

  socket.on("comment", async (comment) => {
    book = await Book.findByIdAndUpdate(
      socket.handshake.query.roomName,
      {
        $push: {
          comments: comment,
        },
      },
      { returnDocument: "after" }
    );
    socket.broadcast.emit("show-comments", book.comments);
    socket.emit("show-comments", book.comments);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

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
app.use("/client", express.static(__dirname + "/client"));

app.use("/user", userRouter);

app.use("/", privatePage, indexRouter);

const baseURL = process.env.MONGODB_URL || `mongodb://localhost:27017/booksbox`;

mongoose
  .connect(baseURL)
  .then((res) => {
    console.log("conected to mongoDB");
    server.listen(PORT, "0.0.0.0", (err) => {
      err
        ? console.log(err)
        : console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Conection failed: ${err}`);
  });
