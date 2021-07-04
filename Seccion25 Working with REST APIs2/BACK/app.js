const express = require("express");
const feedRoutes = require("./routes/feed");
const app = express();
const mongoose = require("mongoose");

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
); // application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ADD ALL OR WILDCARD "*" ALLOW ALL
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/feed", feedRoutes);

mongoose
  .connect(
    "mongodb+srv://Gergusber:ez72PUQOHTqgeBip@cluster0.qob6r.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
