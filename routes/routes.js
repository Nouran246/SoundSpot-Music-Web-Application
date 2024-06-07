const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const indexRoutes = require("./indexRoutes");

function setupRoutes(app) {
  app.use("/", indexRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use((req, res, next) => {
    res.render("404", {
      currentPage: "404",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });
}

module.exports = { setupRoutes };
