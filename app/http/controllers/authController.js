const User = require("../../models/Users");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },

    register(req, res) {
      res.render("auth/register");
    },

    postRegister(req, res) {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        req.flash("error", "All fields required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
    },
  };
}

module.exports = authController;
