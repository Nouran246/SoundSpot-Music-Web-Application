const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

const registrationProcess = async (req, res) => {
  try {
    const { firstname, email, password, confirmPassword, phone_number, gender, country } = req.body;

    if (password !== confirmPassword) {
      return res.render("signup", {
        currentPage: "signup",
        error: "Passwords do not match.",
        user: null,
      });
    }

    const existingUser = await User.findOne({ username: firstname });
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
      username: firstname,
      email,
      password: hashedPassword,
      phone: phone_number,
      gender,
      country,
      type: "user",
    });

    await newUser.save();
    req.session.user = newUser;
    res.redirect("/");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).render("signup", {
      currentPage: "signup",
      error: "Internal Server Error. Please try again later.",
      user: null,
    });
  }
};

module.exports = {
  registrationProcess,
};
