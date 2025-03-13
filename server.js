require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
// Require our new middleware
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// pantries: [foodSchema], // Embedded schema as an array
  // applications: [applicationSchema], // embedding the applicationSchema here

  // Require controllers
const authController = require('./controllers/auth.js');
const pantriesController = require('./controllers/pantries.js')
const path = require('path');

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Use passUserToView middleware to make user available in views,
// passUserToView comes after session middlewware but before homepage
app.use(passUserToView);

// GET Build the pantries Index Page
app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their pantries index
    res.redirect(`/users/${req.session.user._id}/pantries`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

// removed the VIP lounge & updated the index.ejs to cookbook

// Authentication routes, only logged in users can see
app.use('/auth', authController);
// Use isSignedIn middleware to protect routes that come after this
app.use(isSignedIn); //this middleware runs after auth routes - the user needs to authenticate first
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/pantries', pantriesController);

// Start the server
app.listen(port, () => {
  console.log(`The express app is running on port ${port}!`);
});
