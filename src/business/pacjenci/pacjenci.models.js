// import mongoose from 'mongoose'
import mongoose from 'mongoose';

const pacjentSchema = new mongoose.Schema({
  pacjentId: mongoose.Schema.Types.ObjectId,
  dataOrzeczenia: String,
  dataOrzeczeniaUpdated: Boolean,
  decyzja: {
    type: String,
    enum: ['DECYZJA21', 'DECYZJA22', 'DECYZJA23', 'DECYZJA31', 'DECYZJA33', 'DECYZJA34', 'DECYZJA35'],
    default: 'DECYZJA21',
  },
  decyzjaUpdated: Boolean,
  firma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firma',
  },
  imie: { type: String, required: true },
  nazwisko: { type: String, required: true },
  pesel: { type: String, required: true },
  kodPocztowy: String,
  miasto: String,
  nazwaPracodawcy: String,

  nip: String,
  numerKarty: String,
  numerTelefonu: String,

  stanowisko: String,
  ulica: String,
});

export const Pacjent = mongoose.model('Pacjent', pacjentSchema, 'pacjenci');
