const mongoose = require('mongoose');

const firmaSchema = new mongoose.Schema({
  firmaId: mongoose.Schema.Types.ObjectId,
  email: String,
  // firmaId:Schema.Types.ObjectId,
  kodPocztowy: String,
  miasto: String,
  nazwa: String,
  nip: String,
  ryczalt: Number,
  ulica: String
});

module.exports = Firma = mongoose.model('firma', firmaSchema, 'firmy');

// module.exports.Firma = Firma;
