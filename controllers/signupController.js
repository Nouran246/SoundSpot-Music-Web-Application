const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

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
      type,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registrationProcess,
};
