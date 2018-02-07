var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profile = require('./profile');

// Define new Acoount schema with this fields
var Account = new Schema({
  displayname: String,
  user_id: String,
  account_created: {
    Date
  },
  email: String,
  address: String,
  phone: String,
  age: String,
  surname: String
});


// Exporting model
module.exports = mongoose.model('Account', Account);