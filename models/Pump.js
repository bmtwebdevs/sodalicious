var Mongoose = require('mongoose');

exports.PumpSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  ingredientName: { type: String, required: false }
});