const express = require('express');
const router = express.Router();
var passport = require('passport');
var config = require('../../configs/configs');
require('../../configs/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require('../../models/user');

// Login page Routes

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }).select('+password').exec(function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {

      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {

          // if user is found and password is right create a token
          // Token expire in 10min
          var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 600 });

          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});


module.exports = router;