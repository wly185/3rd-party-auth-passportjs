module.exports = function isAuth(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
};
