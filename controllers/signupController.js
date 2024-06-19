const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { sendVerificationEmail } = require("../services/emailService.js");

const registrationProcess = async (req, res) => {
  try {
    const data = {success: false, message: ""};
    const { firstname, email, password, confirmPassword, phone_number, gender, country, type } = req.body;

    const errors = {};
<<<<<<< Updated upstream

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
=======
    if (!firstname) errors.firstname = "Please enter your name";
    if (!email) errors.email = "Please enter your email address";
    if (!password) errors.password = "Please enter your password";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    if (!phone_number) errors.phone_number = "Please enter your mobile number";
    if (!gender) errors.gender = "Please select your gender";
    if (!country) errors.country = "Please select your country";

    if (Object.keys(errors).length > 0) {
      return res.json(errors); // Sends validation errors as JSON
    }

    if (password !== confirmPassword) {
      return res.json({ confirmPassword: "Passwords do not match" }); // Sends passwords do not match error as JSON
>>>>>>> Stashed changes
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
<<<<<<< Updated upstream
      return res.status(400).json({ success: false, errors: { email: 'Email already in use' } });
=======
      return res.json({ email: "Email is already taken" }); // Sends email already taken error as JSON
      data.success = false;
      data.message = "Email is already taken";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({ success: true, message: "Registration successful. Please check your email to verify your account." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: { general: 'Internal Server Error' } });
  }
};

=======
    await sendVerificationEmail(email, verificationToken);

    res.json({ message: "Registration successful. Please check your email to verify your account." }); // Sends success message as JSON
  } catch (error) {
    console.error(error);
    res.json({ general: "Internal Server Error" }); // Sends internal server error as JSON
  }
};



>>>>>>> Stashed changes
module.exports = {
  registrationProcess,
};
