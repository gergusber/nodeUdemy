const path = require("path");
// const db = require('./util/database');
const sequalize = require("./util/database");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

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

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

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
    if(!user.getCart()){
      return user.createCart();
    }
    return Promise.resolve(user.createCart());
    // return user.createCart();
  })
  .then((cart) => {
    cart;
    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
