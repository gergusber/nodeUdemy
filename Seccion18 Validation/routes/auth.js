const express = require("express");
const { check, body } = require("express-validator/check");
const User = require("../models/user");
const authController = require("../controllers/auth");
const { Error } = require("mongoose");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid Email."),
    body(
      "password",
      "Please enter a password with only number and text and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    //   .custom((value, { req }) => {
    //     return User.findOne({ email: value }).then((user) => {
    //       if (!user) {
    //         return Promise.reject("Invalid email or password.");
    //       }
    //     });
    //   }),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid Email.")
      .custom((value, { req }) => {
        // Add custom Validator
        //  if (value == "test@test.com") {
        //     throw new Error("This email address is Forbidden.");
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only number and text and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must to match.");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
