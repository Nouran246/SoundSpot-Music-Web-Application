// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connectToMongoDB } = require('./config/mongo.js');
const { setupRoutes } = require('./routes/routes.js');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,  'uploads')));
// Serve static files
app.use(express.static('public', { maxAge: '7d' }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/uploads/:file', (req, res) => {
  const file = req.params.file;
  const filePath = path.join(__dirname, 'uploads', file);
  res.type('image/jpeg');
  res.sendFile(filePath);
});
// Set view engine
app.set('view engine', 'ejs');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
