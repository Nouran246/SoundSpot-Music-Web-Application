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
        } else if (!/^[a-zA-Z ]+$/.test(firstname)) {
            errors.name = 'Name should only contain alphabets and spaces';
        }

        if (!email) {
            errors.email = 'Please enter your email address';
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!password) {
            errors.password = 'Please enter your password';
        } else if (password.length < 3) {
            errors.password = 'Password must be at least 3 characters long';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!phone_number) {
            errors.phone_number = 'Please enter your mobile number';
        } else if (!/^\d{10}$/.test(phone_number)) {
            errors.phone_number = 'Please enter a valid 10-digit phone number';
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
