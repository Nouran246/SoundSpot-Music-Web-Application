const User = require("../models/Users.js");

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

// Delete a user
const deleteUser = async (req, res) => {
  try {
      const { userIds } = req.body;
      if (!userIds || !Array.isArray(userIds)) {
          return res.status(400).send({ error: 'Invalid user IDs' });
      }

      await User.deleteMany({ _id: { $in: userIds } });
      res.status(200).send({ message: 'Users deleted successfully' });
  } catch (error) {
      console.error('Error deleting users:', error);
      res.status(500).send({ error: 'An error occurred while deleting users' });
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
};
