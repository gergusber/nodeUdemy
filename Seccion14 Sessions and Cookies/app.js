const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  User.findById("605a3b3b28d44d3c3c473f6a")
    .then((user) => {
      req.user = user;
      console.log("user", user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
  )
  .then((result) => {
    User.findOne().then((usr) => {
      console.log("Hay un usr?", usr);

      if (!usr) {
        const user = new User({
          name: "German",
          email: "gerbertea@gmail.com",
          cart: {
            items: [],
          },
        });

        user.save();
      }
    });

    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
