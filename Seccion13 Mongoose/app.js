const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const app = express();
// const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("60579df424123c58a3bad616")
//     .then((user) => {
//       req.user = new User(user.user, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://gerbertea:2cGqcNg6aLYUBaNG@cluster0.yiltf.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
