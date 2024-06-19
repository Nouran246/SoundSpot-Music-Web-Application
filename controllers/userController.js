const User = require("../models/Users.js");
const bcrypt = require('bcrypt');

// Display all users
// const displayAllUsers = async (req, res) => {
//   try {

//     const users = await User.find();
//     console.log(users);
//     res.render("AdminPart/ManageUsers", {
//       users
//     })

//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// Add a new user
const addUser = async (req, res) => {
  try {
    const { username, password, email, phone, gender, country, type } = req.body;
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
    res.status(201).send('User added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};



// Delete a user
const deleteUser = async (req, res) => {
  try {
      const { userIds } = req.body;
      await User.deleteMany({ _id: { $in: userIds } }); // Use _id for MongoDB ObjectId
      res.status(200).send('Users deleted successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

// Edit a user
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, phone, gender, country, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        password: hashedPassword,
        email,
        phone,
        gender,
        country,
        type,
      },
      { new: true }
    );
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addUser,
  deleteUser,
  editUser,
};
