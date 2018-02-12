const express = require('express');
const router = express.Router();
var Product = require('../../models/product');
    rimraf = require('rimraf');
    passport = require('passport');
    jwt = require('jsonwebtoken');

require('../../configs/passport')(passport);

//var multer  = require('multer') // for file upload library
//var upload = multer({ dest: 'uploads/' })

/**
 * PRODUCTS PAGE
 *
 * 1) Upload images
 *
 */

router.get('/', passport.authenticate('jwt', { session: false}), function (req, res) {

  var page = 1;
  var limit = 20;

  if (req.query.page) page = req.query.page;
  if (req.query.page < 1) page = 1;
  if (req.query.limit) limit = req.query.limit;

  Product.paginate({}, { page: page, limit: limit }, function (err, products) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      users: products.docs,
      total: products.total,
      limit: products.limit,
      page: products.page,
      pages: products.pages
    })
  });
});


router.get('/:id', passport.authenticate('jwt', { session: false}), function (req, res) {

  Product.findById({_id: req.params.id}, function (err, products) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      products: products
    })
  });
});


router.put('/:id', passport.authenticate('jwt', { session: false}),  function(req, res) {

  // req.on('data', function(data)  {
  //   console.log(data.toString());
  // });

  var imgLink = '';

  Product.findOneAndUpdate({_id: req.params.id}, {
    $set: {
      email: req.body.email,
      displayName: req.body.displayName,
      image: imgLink,
      productSize: req.body.productSize
    }
  }, { new: false }, function (err, user) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      });
    }

    return res.json({
      message: "edited successfully"
    })
  });
});


router.delete('/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
  Product.findByIdAndRemove(req.params.id, function(err, product) {
    if (err) {
      return res.status(500).send(err);
    }

    // Creating path to delete image folder with image both
    if(product.image) rimraf("./public/" + product.imageFolderName, function() { console.log('image delete'); });
  });
  return res.json({
    success : "Deleted Successfully",
    status : 200
  });
});


router.post('/search', passport.authenticate('jwt', { session: false}), function (req, res) {

  var char = '';
  if(req.body.email) char = req.body.email;

  Product.find({email: {$regex: '^' + char }}).exec(function (err, product) {
    if (err) {
      return res.json({
        message: "error",
        error: err
      })
    }

    return res.json({
      message: "success",
      user: product
    })
  });

});

module.exports = router;
