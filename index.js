const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");

// Configure passport
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/weather-app';
mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Create MongoDB session store
const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions'
});
store.on('error', function (error) {
  console.error('Session store error:', error);
});

// Set view engine
app.set("view engine", "ejs");
app.use(express.static("public"));


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'fadfhdakhf$#!@$wshfaishdf',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/login"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has started at port ${PORT}`));
