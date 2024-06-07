// controllers/loginController.js
const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

const loginProcess = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        currentPage: "login",
        error: "Invalid username or password.",
        user: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        currentPage: "login",
        error: "Invalid username or password.",
        user: null,
      });
    }

    req.session.user = user;
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginProcess,
};
