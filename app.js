const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const { connectToMongoDB } = require("./config/mongo.js");
const { setupRoutes } = require("./routes/routes.js");

const app = express();

// Serve static files
app.use(express.static("public", { maxAge: "7d" }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set view engine
app.set("view engine", "ejs");

// Connect to MongoDB
connectToMongoDB();

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Setup routes
setupRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
