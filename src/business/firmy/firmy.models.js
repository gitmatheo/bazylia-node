import mongoose from 'mongoose';

const firmaSchema = new mongoose.Schema({
  firmaId: mongoose.Schema.Types.ObjectId,
  email: String,
  kodPocztowy: String,
  miasto: String,
  nazwa: String,
  nip: String,
  ryczalt: Number,
  ulica: String
});

export const Firma = mongoose.model('Firma', firmaSchema, 'firmy');

