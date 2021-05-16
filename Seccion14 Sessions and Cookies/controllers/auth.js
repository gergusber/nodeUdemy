exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie").split("=")[1]);
  const isLogedIn = req.get("Cookie").split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLogedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLogedIn = true;
  res.redirect("/");

  // res.setHeader("Set-Cookie", "loggedIn=true");
  // res.redirect("/");
};
