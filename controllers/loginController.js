const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
//
const loginProcess = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    req.session.user = user;
    res.redirect("/user-home"); // Redirect to the user home page after login
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginProcess,
};
