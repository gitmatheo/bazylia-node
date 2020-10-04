// import mongoose from 'mongoose'
const mongoose = require('mongoose');
const Firma = require('../firmy/firmy.models');

const pacjentSchema = new mongoose.Schema({
  pacjentId: mongoose.Schema.Types.ObjectId,
  dataOrzeczenia: String,
  dataOrzeczeniaUpdated: Boolean,
  decyzja: {
    type: String,
    enum : ['DECYZJA21', 'DECYZJA22', 'DECYZJA23', 'DECYZJA31', 'DECYZJA33', 'DECYZJA34', 'DECYZJA35'],
    default: 'DECYZJA21'
  },
  decyzjaUpdated: Boolean,
  firma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firma'
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
  ulica: String
});

module.exports = Pacjent = mongoose.model('pacjent', pacjentSchema, 'pacjenci');

