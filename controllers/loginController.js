const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerView = (req, res) => {
  res.render("register", {});
};

const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }

  if (password !== confirm) {
    console.log("Password must match");
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

const loginView = (req, res) => {
  res.render("login", {});
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};

const logoutView = (req, res) => {
  req.session.destroy();
  res.render("login", {});
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
  logoutView,
};
