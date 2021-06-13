const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  let mesage = req.flash("error");
  if (mesage.lenth > 0) {
    mesage = mesage[0];
  } else {
    mesage = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: mesage,
  });
};

exports.getSignup = (req, res, next) => {
  let mesage = req.flash("error");
  if (mesage.lenth > 0) {
    mesage = mesage[0];
  } else {
    mesage = null;
  }

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: mesage,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "invalid email or password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(pass, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((usrDoc) => {
      if (usrDoc) {
        req.flash("error", "Email exists already.");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPass) => {
          const user = new User({
            email: email,
            password: hashedPass,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "gerbertea@gmail.com",
            subject: "Signup Succed",
            html: "<h1> You sucessfully signed up! </h1>",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  // User.add
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let mesage = req.flash("error");
  if (mesage.lenth > 0) {
    mesage = mesage[0];
  } else {
    mesage = null;
  }
  //Crear token

  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Pasword",
    errorMessage: mesage,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
      // return res.redirect("/reset");
    }

    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          console.log("Aca wacho");
          req.flash("error", "No account with that email found");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((res) => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "gerbertea@gmail.com",
          subject: "Passwor reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}"> link </a> to set a new password</p>

          `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((usr) => {
      let mesage = req.flash("error");
      if (mesage.lenth > 0) {
        mesage = mesage[0];
      } else {
        mesage = null;
      }
      //Crear token

      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Pasword",
        errorMessage: mesage,
        userId: usr._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((usr) => {
      resetUser = usr;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPass) => {
      resetUser.password = hashedPass;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
