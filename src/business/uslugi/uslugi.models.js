import mongoose from 'mongoose';

const uslugaSchema = mongoose.Schema({
  uslugaId: mongoose.Schema.Types.ObjectId,
  cenaZwykla: Number,
  nazwa: String,
  typWizyty: String,
  pkwiu: String,
  stawkaVat: Number
});

export const Usluga = mongoose.model('Usluga', uslugaSchema, 'uslugi');
  
