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

// Method to fetch user data for editing
const getUserForEdit = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data for editing:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to update user data
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, phone, type, gender, country } = req.body;

    console.log(`Updating user with ID: ${userId}`);
    console.log('Received data:', req.body);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      username,
      email,
      phone,
      type,
      gender,
      country,
    }, { new: true });

    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).send("User not found");
    }

    console.log('User updated successfully:', updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUserForEdit,
  addUser,
  updateUser,
  deleteUser,
};
