const express = require("express");
const feedRoutes = require("./routes/feed");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json());

//Static image
app.use("/images", express.static(path.join(__dirname, "images")));

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

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({
    message: message,
  });
});

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
