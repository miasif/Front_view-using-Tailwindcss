const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const adminController = require("../app/http/controllers/admin/adminController");

function routesInitialize(app) {
  app.get("/", homeController().index);
  app.get("/login", authController().login);
  app.post("/login", authController().postLogin);

  app.get("/register", authController().register);
  app.post("/register", authController().postRegister);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  // //admin
  // app.get("/admin", adminController().index);
}

module.exports = routesInitialize;
