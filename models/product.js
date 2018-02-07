var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validate');
const uuidV1 = require('uuid/v1');
var path = require('path');
var fs = require('fs');
var configs = require('../configs/configs');

// Here is my new Person schema with this fields which I want to manage on page

var Product = new Schema({
  email: {
    type: String,
    required: [true, 'Email value is required'],
    validate: [
      validate.email, 'invalid email address'
    ]
  },
  displayName: {
    type: String,
    enum: { values: 'opening open closing closed'.split(' '), message: 'display name value invalid! choose one of - opening - open - closing - closed' },
    required: [true, 'displayName value is required']
  },
  image: String,
  imageFolderName: String,
  productSize: {
    type: Number,
    required: [true, 'productSize value is required'],
    min: [6, 'Too few'],
    max: [12, 'too many']
  }
});


// Pre save action for upload image

Product.pre('save', function(next, req) {

  if(req.files.image) {
    var directory = configs.imageDirecory;
    var sampleFile = req.files.image;
    var fileName = uuidV1();
    var fileFormat = path.extname(sampleFile.name);

    if(req.files.image != undefined) {

      // Creating new directory folder for image and pass image there, and write path to image to variable
      var newDir = directory + fileName;
      fs.mkdirSync(directory + fileName);

      sampleFile.mv(newDir + "/" + fileName + fileFormat, function(err) {
        next(err);
      });
    }

    this.image = '/img/' + fileName + "/" + fileName + fileFormat;
    this.imageFolderName = '/img/' + fileName;
  }

  next();
});


// Exporting my new Schema

module.exports = mongoose.model('Product', Product);


