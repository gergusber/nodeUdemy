const express = require("express");
const todoRoutes = require("./routes/todos");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Simple node middlware");
  next();
});
app.use(todoRoutes);
app.listen(3000);
