const express = require('express');
const router = express.Router();
var passport = require('passport');
var User = require('../../models/user');

require('../../configs/passport')(passport);


// Register page via passport

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {

    // define new model object
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // save the user
    newUser.save(function(err, user) {
      if (err) {
        return res.json({message: 'Username already exists.' + err});
      }

      res.json({
        message: 'Successful created new user.',
        user: {
          username: user.username,
          id: user._id,
          created_date: user.created_date,
          updated_date: user.updated_date
        }
      });
    });
  }
});

module.exports = router;