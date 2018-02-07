/**
 * User model special for testing the JWT token
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Account = require('./account');
var validate = require('mongoose-validate');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Too few'],
    max: [12, 'too many'],
    select: false
  },
  email: {
    type: String,
    validate: [
      validate.email, 'invalid email address'
    ]
  },
  address: String,
  phone: String,
  age: String,
  surname: String,
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  user.updated_date = Date.now;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.post('save', function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  //Vouchers.remove({user_id: this._id}).exec();
  console.log("shema", this)
  var profile = new Account({
    user_id: this._id,
    displayname: this.username
  });

  profile.save(function(err) {
    if (err) {
      return err;
    }
    console.log("post test", profile);
  });

});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);