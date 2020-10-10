import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const wizytaSchema = new Schema({
  wizytaId: Schema.Types.ObjectId,
  firmaId: Schema.Types.ObjectId,
  pacjent: {
    type: Schema.Types.ObjectId,
    ref: 'Pacjent',
  },
  typWizyty: {
    type: String,
    enum: ['MEDYCYNA_PRACY', 'SPECJALISTYKA'],
    default: 'MEDYCYNA_PRACY',
  },
  rodzajBadan: {
    type: String,
    enum: ['WSTEPNE', 'OKRESOWE', 'KONTROLNE', 'CELOWE', 'KONCOWE', 'SANITARNO_EPIDEMIOLOGICZNE', null],
    default: null,
  },
  dataWizyty: String,
  usluga: Object,
  faktura: Schema.Types.Mixed,
});

export const Wizyta = mongoose.model('Wizyta', wizytaSchema, 'wizyty');
