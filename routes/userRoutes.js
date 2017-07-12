var express = require('express');
var router = express.Router();
var User = require("../models/userModel");
var passport = require('passport');

router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user)
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

router.get('/currentUser', function(req, res, next) {
  if (req.user) {
    res.send(req.user)
  } else {
    res.send(null)
  }
    // Goal.find(handler(res, next));
})

module.exports = router;