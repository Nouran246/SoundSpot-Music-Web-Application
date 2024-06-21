require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connectToMongoDB } = require('./config/mongo.js');
const { setupRoutes } = require('./routes/routes.js');
const app = express();
const path = require('path');
<<<<<<< HEAD
const cors= require('cors');

const corsConfig = {
  origin: "https://sound-spot-music-web-application-leh07zoku.vercel.app/",
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
};

// Use cors middleware with corsConfig
app.use(cors(corsConfig));

// Use the corsConfig for preflight requests
app.options('*', cors(corsConfig));
=======
const cors=require('cors');
const corsConfig ={

  origin: "https://sound-spot-music-web-application-1ud6ag6hz.vercel.app/",
  credential:true,
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders: ['Content-Type'],
  };
  app.options(cors(corsConfig));
>>>>>>> edit
// Serve static files
app.use(express.static(path.join(__dirname, 'uploads')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


// Route to serve uploaded files
app.get('/uploads/:file', (req, res) => {
  const file = req.params.file;
  const filePath = path.join(__dirname, 'uploads', file);

  if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
    res.type('image/jpeg');
  } else if (file.endsWith('.mp3') || file.endsWith('.mpeg')) {
    res.type('audio/mpeg');
  } else {
    return res.status(400).send('File type not supported');
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
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

app.listen(PORT,()=>{
  console.log("server is running.............")
})