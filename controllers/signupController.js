const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
//
const registrationProcess = async (req, res) => {
  try {
    const { username, password, email, phone, gender, country, type } = req.body;

    if (!username || !password || !email || !phone || !gender || !country || !type) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      gender,
      country,
      type: "user",
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
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
