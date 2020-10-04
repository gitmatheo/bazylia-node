const Wizyta = require('../wizyty.models');
const mongoose =require('mongoose'); 
const Schema = mongoose.Schema;

describe('Wizyta model', () => {
  describe('schema', () => {
    test('wizytaId', () => {
      const wizytaId = Wizyta.schema.obj.wizytaId
      expect(wizytaId).toEqual(mongoose.Schema.Types.ObjectId)
    })

    test('firmaId', () => {
      const firmaId = Wizyta.schema.obj.firmaId
      expect(firmaId).toEqual(mongoose.Schema.Types.ObjectId)
    })

    test('pacjent', () => {
        const pacjent = Wizyta.schema.obj.pacjent;
        expect(pacjent).toEqual({
          type: Schema.Types.ObjectId,
          ref: 'Pacjent'
        })
    })

    test('typWizyty', () => {
        const typWizyty = Wizyta.schema.obj.typWizyty;
        expect(typWizyty).toEqual({
          type: String,
          enum : ['MEDYCYNA_PRACY', 'SPECJALISTYKA'],
          default: 'MEDYCYNA_PRACY'
        })
    })

    test('rodzajBadan', () => {
      const rodzajBadan = Wizyta.schema.obj.rodzajBadan;
      expect(rodzajBadan).toEqual({
        type: String,
        enum : ['WSTEPNE', 'OKRESOWE', 'KONTROLNE', 'CELOWE', 'KONCOWE', 'SANITARNO_EPIDEMIOLOGICZNE'],
        default: 'WSTEPNE'
      })
    })

    test('dataWizyty', () => {
      const dataWizyty = Wizyta.schema.obj.dataWizyty;
      expect(dataWizyty).toEqual(String)
    })

    test('usluga', () => {
      const usluga = Wizyta.schema.obj.usluga;
      expect(usluga).toEqual(Object)
    })

    test('faktura', () => {
      const faktura = Wizyta.schema.obj.faktura;
      expect(faktura).toEqual(Schema.Types.Mixed)
    })

})

})