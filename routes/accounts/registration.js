const express = require('express');
const router = express.Router();
var passport = require('passport');
var config = require('../../configs/configs');
require('../../configs/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var Account = require('../../models/account');

// Register page via passport ROUTES

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {

    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    var d = Date.now();
    var nd = new Date(d);

    console.log(d, nd);

    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.' + err});
      }

      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;