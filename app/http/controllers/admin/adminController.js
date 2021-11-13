function adminController() {
  return {
    index(req, res) {
      res.render("admin/home");
    },
  };
}

module.exports = adminController;
