const express = require("express");

const app = express();
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

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

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
  })
);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb+srv://gerbertea:dc7XmyotG9NErgef@cluster0.xm92h.mongodb.net/FeedDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
