// controllers/signupController.js
const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

const registrationProcess = async (req, res) => {
  try {
    const { firstname, email, password, confirmPassword, phone_number, gender, country, type } = req.body;

    // Validate required fields
    if (!firstname || !email || !password || !confirmPassword || !phone_number || !gender || !country || !type) {
      return res.status(400).send("All fields are required");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username: firstname,
      password: hashedPassword,
      email,
      phone: phone_number,
      gender,
      country,
      type,
    });

    await newUser.save();

    // Set session user
    req.session.user = newUser;

    // Redirect to user home page
    res.redirect("/auth/user-home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registrationProcess,
};
