const mongoose = require('mongoose');
const Pacjent = require('../pacjenci/pacjenci.models');
const Usluga = require('../uslugi/uslugi.models');
const Schema = mongoose.Schema;



const wizytaSchema = new mongoose.Schema({
  wizytaId: Schema.Types.ObjectId,
  firmaId: Schema.Types.ObjectId,
  pacjent: {
    type: Schema.Types.ObjectId,
    ref: 'Pacjent'
  },
  typWizyty: {
    type: String,
    enum : ['MEDYCYNA_PRACY', 'SPECJALISTYKA'],
    default: 'MEDYCYNA_PRACY'
  },
  rodzajBadan: {
    type: String,
    enum : ['WSTEPNE', 'OKRESOWE', 'KONTROLNE', 'CELOWE', 'KONCOWE', 'SANITARNO_EPIDEMIOLOGICZNE'],
    default: 'WSTEPNE'
  },
  dataWizyty: String,
  usluga: Object,
  faktura: Schema.Types.Mixed
});

// const wizytaRozliczeniaSchema = new mongoose.Schema({
//   dataWizyty: String,
//   usluga: Usluga,
//   wizytaId: Schema.Types.ObjectId
// });

module.exports = Wizyta = mongoose.model('wizyta', wizytaSchema, 'wizyty');
