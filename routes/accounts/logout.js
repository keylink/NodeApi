const express = require('express');
const router = express.Router();


// Logout Routes

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;