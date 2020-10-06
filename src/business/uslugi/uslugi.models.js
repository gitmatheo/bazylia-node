const mongoose = require('mongoose');

const uslugaSchema = mongoose.Schema({
  uslugaId: mongoose.Schema.Types.ObjectId,
  cenaZwykla: Number,
  nazwa: String,
  typWizyty: String,
  pkwiu: String,
  stawkaVat: Number
});

module.exports = Usluga = mongoose.model('Usluga', uslugaSchema, 'uslugi');
  
