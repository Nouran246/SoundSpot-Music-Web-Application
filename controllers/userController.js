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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role, phone, gender, country, state } = req.body;

  try {
      const updatedUser = await User.findByIdAndUpdate(
          id,
          { username, email, role, phone, gender, country, state },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(404).send('User not found');
      }

      res.json(updatedUser); // Optionally, send back the updated user object
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user); // Send user data as JSON response
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
