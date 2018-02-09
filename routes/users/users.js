const express = require('express');
const router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var config = require('../../configs/configs');

require('../../configs/passport')(passport);


/**
 * User CRUD page
 * Use JWT token as security
 */


router.get('/', passport.authenticate('jwt', { session: false}), function (req, res) {

  var page = 1;
  var limit = 20;

  if (req.query.page) page = req.query.page;
  if (req.query.page < 1) page = 1;
  if (req.query.limit) limit = req.query.limit;

  User.paginate({}, { page: page, limit: limit }, function (err, users) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      users: users.docs,
      total: users.total,
      limit: users.limit,
      page: users.page,
      pages: users.pages
    })
  });

});


router.get('/me', passport.authenticate('jwt', { session: false }), function (req, res) {
  var user = {};

  jwt.verify(req.headers.authorization.slice(4), config.secret, function(err, currentUser) {
    user = currentUser;
  });

  User.findById({ _id: user._id }, function (err, user) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      user: user
    })
  });

});


router.get('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {

  User.findById({_id: req.params.id}, function (err, user) {
    if (err) {
      res.statusCode = 404;
      return res.send({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      user: user
    })
  });

});


router.post('/search', passport.authenticate('jwt', { session: false}), function (req, res) {

  var char = '';
  if(req.body.username) char = req.body.username;

  User.find({username: {$regex: '^' + char }}).exec(function (err, user) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      user: user
    })
  });

});


router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {

  var user = {};

  jwt.verify(req.headers.authorization.slice(4), config.secret, function(err, currentUser) {
    user = currentUser;
  });

  User.findOneAndUpdate({_id: req.params.id}, {
    $set: {
      displayname: req.body.displayname,
      address: req.body.address,
      phone: req.body.phone,
      age: req.body.age,
      email: req.body.email,
      updated_date: getDate()
    }
  }, { new: false }, function (err, user) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      });
    }
  });

  return res.json({
    message: "edited successfully"
  })
});


router.delete('/:id', passport.authenticate('jwt', { session: false}), function (req, res) {

  User.findByIdAndRemove({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }
    return res.json({message: "user deleted"});
  });

});


// Get localTimeZone date
function getDate() {
  var currectDate = new Date();
  var date = new Date(new Date(currectDate).getTime() + 360*60*1000); // 360 - means hours in min
  return date;
}

module.exports = router;