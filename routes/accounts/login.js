const express = require('express');
const router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../configs/configs');
var User = require('../../models/user');

require('../../configs/passport')(passport);


// Login page Routes

router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }).select('+password').exec(function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {

      // check if password matches
      user.comparePassword( req.body.password, function (err, isMatch) {
        if (isMatch && !err) {

          // if user is found and password is right create a token
          // Token expire in 10min
          var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 600 });

          // return the information including token as JSON
          res.json({
            message: "success",
            token: 'JWT ' + token,
            user: {
              username: user.username,
              email: user.email,
              address: user.address,
              age: user.age,
              phone: user.phone,
              created_date: user.created_date,
              updated_date: user.updated_date
            }
          });
        } else {
          res.status(401).send({
            message: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});


module.exports = router;