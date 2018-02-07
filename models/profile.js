var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define new Acoount schema with this fields

module.exports = new Schema({
  email: String,
  address: String,
  phone: String,
  age: String,
  surname: String
});