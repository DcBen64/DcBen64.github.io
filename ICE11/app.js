//Wow cool
require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

// Replace the following URL with your MongoDB connection string.
// If you're using a local MongoDB instance, the URL will be 'mongodb://localhost/your_database_name'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/BMWeb';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));

// Use express-session middleware
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));

// Use connect-flash middleware
app.use(flash());

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Include and use routes
const routes = require('./Routes/routes');
app.use('/', routes);


module.exports = app;
module.exports.isAuthenticated = isAuthenticated;

