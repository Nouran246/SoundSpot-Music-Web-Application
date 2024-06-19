const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { sendVerificationEmail } = require("../services/emailService.js");

const registrationProcess = async (req, res) => {
try {
const { firstname, email, password, confirmPassword, phone_number, gender, country, type } = req.body;

const errors = {};

if (!firstname) {
  errors.name = 'Please enter your name';
}
if (!email) {
  errors.email = 'Please enter your email address';
}
if (!password) {
  errors.password = 'Please enter your password';
}
if (password !== confirmPassword) {
  errors.confirmPassword = 'Passwords do not match';
}
if (!phone_number) {
  errors.phone_number = 'Please enter your mobile number';
}
if (!gender) {
  errors.gender = 'Please select your gender';
}
if (country === 'Select') {
  errors.country = 'Please select your country';
}
if (!type) {
  errors.type = 'User type is required';
}

if (Object.keys(errors).length > 0) {
  return res.status(400).json({ success: false, errors });
}

const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ success: false, errors: { email: 'Email already in use' } });
}

const hashedPassword = await bcrypt.hash(password, 10);
const verificationToken = crypto.randomBytes(32).toString('hex');

const newUser = new User({
  username: firstname,
  password: hashedPassword,
  email,
  phone: phone_number,
  gender,
  country,
  type,
  verificationToken,
  isVerified: false,
});

await newUser.save();

await sendVerificationEmail(email, verificationToken);

res.status(200).json({ success: true, message: "Registration successful. Please check your email to verify your account." });
} catch (error) {
console.error(error);
res.status(500).json({ success: false, errors: { general: 'Internal Server Error' } });
}
};

module.exports = {
registrationProcess,
};