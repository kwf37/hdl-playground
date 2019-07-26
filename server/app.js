const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/index');

const fu = require('./file_utils.js');

const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));

// Set up route handlers
app.use('/', routes);

// Mongoose setup
mongoose.connect('mongodb://localhost/passport-hdl-playground', {useNewUrlParser: true});

// Passport config
const Account = require('./account.js');
passport.use(new LocalStrategy(Account.authenticate()));

// Set serialization methods for passport
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  console.log(req.query);
  is_valid = req.query != undefined && req.query.problem != undefined && req.query.language != undefined;
  if (is_valid) {
  var list = [req.query.problem, 'item2', req.query.language];
  res.json(list);
  console.log('Sent list of items');
  } else {
    console.error('bad list request');
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});


const port = 3001;
app.listen(port);

//fu.init_dir();

console.log('Listening on Port ' + port);