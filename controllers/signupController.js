const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

const registrationProcess = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phone_number, gender, country, type } = req.body;
    console.log(req.body);
    if (password !== confirmPassword) {
      return res.render("signup", {
        currentPage: "signup",
        error: "Passwords do not match.",
        user: null,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("signup", {
        currentPage: "signup",
        error: "Username already exists.",
        user: null,
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.render("signup", {
        currentPage: "signup",
        error: "Email already exists.",
        user: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone: phone_number,
      gender,
      country,
      type,
    });

    await newUser.save();
    req.session.user = newUser;
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registrationProcess,
};
