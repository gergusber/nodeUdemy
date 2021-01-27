const path = require("path");
// const db = require('./util/database');
const sequalize = require("./util/database");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// TestDb
// db.execute('Select * from products')
//     .then(result => {
//         console.log(result[0]);
//     })
//     .catch(err =>{
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequalize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3002);
