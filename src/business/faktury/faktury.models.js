import mongoose from 'mongoose';

const uslugiSubSchema = new mongoose.Schema(
  {
    uslugaId: mongoose.Schema.Types.ObjectId,
    cenaZwykla: Number,
    nazwa: String,
    typWizyty: String,
    pkwiu: String,
    stawkaVat: Number,
  },
  { _id: false },
);
const FakturaSchema = new mongoose.Schema({
  fakturaId: mongoose.Schema.Types.ObjectId,
  dataFaktury: String,
  numerFaktury: String,
  firma: {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    kodPocztowy: String,
    miasto: String,
    nazwa: String,
    nip: String,
    ryczalt: Number,
    ulica: String,
  },
  sposobPlatnosci: {
    type: String,
    enum: ['GOTOWKA', 'PRZELEW'],
    default: 'GOTOWKA',
  },
  sumaNetto: String,
  sumaBrutto: String,
  terminPlatnosci: Number,
  uslugi: [uslugiSubSchema],
  dataUslugi: String,
});

export const Faktura = mongoose.model('Faktura', FakturaSchema, 'faktury');
