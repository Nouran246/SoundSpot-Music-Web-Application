// controllers/signupController.js
const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { sendVerificationEmail } = require("../services/emailService.js");

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

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user with isVerified set to false
    const newUser = new User({
      username: firstname,
      password: hashedPassword,
      email,
      phone: phone_number,
      gender,
      country,
      type,
      verificationToken,
      isVerified: false, // Ensure user starts as unverified
    });

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Do not set session user here

    // Redirect to a page informing the user to check their email for verification
    res.status(200).send("Registration successful. Please check your email to verify your account.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  registrationProcess,
};
