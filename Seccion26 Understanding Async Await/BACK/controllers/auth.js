const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation Failed, enter data is incorrect");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    const hashPass = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashPass,
      name: name,
    });
    await user.save();

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User with this email couldnt be found");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  // User.findOne({ email: email })
  //   .then((user) => {
  //     if (!user) {
  //       const error = new Error("User with this email couldnt be found");
  //       error.statusCode = 401;
  //       throw error;
  //     }

  //     loadedUser = user;
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((isEqual) => {
  //     if (!isEqual) {
  //       const error = new Error("Wrong password");
  //       error.statusCode = 401;
  //       throw error;
  //     }
  //     //we create the jwt

  //     const token = jwt.sign(
  //       {
  //         email: loadedUser.email,
  //         userId: loadedUser._id.toString(),
  //       },
  //       "secret",
  //       { expiresIn: "1h" }
  //     );

  //     res.status(200).json({
  //       token: token,
  //       userId: loadedUser._id.toString(),
  //     });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};
