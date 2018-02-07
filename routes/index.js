const express = require('express');
const router = express.Router();
var products = require('./products/products');
var users = require('./users/users');
var login = require('./accounts/login');
var logout = require('./accounts/logout');
var registration = require('./accounts/registration');

// Routes import start here ********

router.use('/products', products);
router.use('/users', users);
router.use('/', login);
router.use('/', logout);
router.use('/', registration);

// Root page route

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

// 404 page
router.get('*', function(req, res){
  res.send('Sorry this page doesnt exist', 404);
});


module.exports = router;