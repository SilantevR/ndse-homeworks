const privatePage = function (req, res, next) {
  req.isAuthenticated() ? next() : res.redirect("/user/login");
};

module.exports = privatePage;
