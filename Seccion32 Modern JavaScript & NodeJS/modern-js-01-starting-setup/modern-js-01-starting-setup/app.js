const fs = require("fs");
const resHandler = require("./response-handler");
const express = require("express");

const app = express();
app.get("/", resHandler);
app.listen(3000);
