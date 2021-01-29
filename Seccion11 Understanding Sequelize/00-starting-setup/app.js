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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Relationships
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequalize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
