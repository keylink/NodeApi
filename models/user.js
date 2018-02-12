/**
 * User model special for testing the JWT token
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
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
  phone: String,
  age: String,
  surname: String,
  address: {
    street: String
  },
  created_date: {
    type: Date,
    default: getDate()
  },
  updated_date: {
    type: Date,
    default: getDate()
  }
});


UserSchema.pre('save', function (next) {
  var user = this;

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


UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};


function getDate() {
  var currentDate = new Date();
  return new Date(new Date(currentDate).getTime() + 360*60*1000);
}

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);