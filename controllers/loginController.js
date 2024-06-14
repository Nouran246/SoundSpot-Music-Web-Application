const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

const loginProcess = async (req, res) => {
  try {
    const { loginemail, password } = req.body;
    const user = await User.findOne({ email: loginemail });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    if (!user.isVerified) {
      return res.status(401).send("Please verify your email before logging in");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    req.session.user = user;
    if (user.type === "user") {
      res.redirect("/auth/UserHomePage");
    } else if (user.type === "admin") {
      res.redirect("/auth/home");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  loginProcess,
};
