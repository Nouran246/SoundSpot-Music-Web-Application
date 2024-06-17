const express = require("express");
const userController = require("../controllers/userController");
const app = express();
const User = require("../models/Users.js");

// Middleware to check if the user is logged in
app.use((req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    } else {
        res.render("404", {
            user: req.session.user === undefined ? "" : req.session.user,
            currentPage: "404",
        });
    }
});

// User-related routes
app.get("/users" ,async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.render("/ManageUsers", {
        users
      })
  
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send("Internal Server Error");
    }
  });

app.post("/users", userController.addUser);
app.delete("/users/:id", userController.deleteUser);
app.put("/users/:id", userController.editUser);

module.exports = app;
