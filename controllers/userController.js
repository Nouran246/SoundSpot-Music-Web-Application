const User = require("../models/Users.js");

const displayAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render("displayusers", {
      users,
      currentPage: "display",
      user: req.session.user || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  displayAllUsers,
};
