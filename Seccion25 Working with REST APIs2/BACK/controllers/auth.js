const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation Failed, enter data is incorrect");
    error.statusCode = 422;
    error.data = error.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
};
