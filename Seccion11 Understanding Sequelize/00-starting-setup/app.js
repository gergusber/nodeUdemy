const path = require("path");
// const db = require('./util/database');
const sequalize = require("./util/database");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require('./models/cart');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Relationships
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequalize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result)
  })
  .then((usr) => {
    if (!usr) {
      return User.create({
        name: "German",
        email: "dummy@email.com",
      });
    }
    return Promise.resolve(usr);
  })
  .then((user) => {
    // console.log(user);
    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
