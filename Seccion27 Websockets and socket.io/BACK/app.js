const express = require("express");
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const socket = require("socket.io");

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>

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

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

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
    const server = app.listen(8080);

    //Add cors for the localhost 3000
    let options = {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    };
    const io = require("./socket").init(server);

    console.log("client!!!!!!!!");
    io.on("connection", (socket) => {
      console.log("client connected!!!!!!!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
