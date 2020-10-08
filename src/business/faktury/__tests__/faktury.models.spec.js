import { Faktura } from '../faktury.models.js';
import mongoose from 'mongoose';

describe('Faktura model', () => {
  describe('schema', () => {
    test('fakturaId', () => {
      const fakturaId = Faktura.schema.obj.fakturaId
      expect(fakturaId).toEqual(mongoose.Schema.Types.ObjectId)
    })

    test('dataFaktury', () => {
        const dataFaktury = Faktura.schema.obj.dataFaktury;
        expect(dataFaktury).toEqual(String)
    })

    test('numerFaktury', () => {
        const numerFaktury = Faktura.schema.obj.numerFaktury;
        expect(numerFaktury).toEqual(String)
    })

    test('firma', () => {
        const firma = Faktura.schema.obj.firma;
        expect(firma).toEqual({
            _id: mongoose.Schema.Types.ObjectId,
            email: String,
            kodPocztowy: String,
            miasto: String,
            nazwa: String,
            nip: String,
            ryczalt: Number,
            ulica: String
          })
    })

    test('sposobPlatnosci', () => {
        const sposobPlatnosci = Faktura.schema.obj.sposobPlatnosci;
        expect(sposobPlatnosci).toEqual({
            type: String,
            enum : ['GOTOWKA', 'PRZELEW'],
            default: 'GOTOWKA'
          })
    })

    test('sumaNetto', () => {
        const sumaNetto = Faktura.schema.obj.sumaNetto;
        expect(sumaNetto).toEqual(String)
    })

    test('sumaBrutto', () => {
        const sumaBrutto = Faktura.schema.obj.sumaBrutto;
        expect(sumaBrutto).toEqual(String)
    })

    test('terminPlatnosci', () => {
        const terminPlatnosci = Faktura.schema.obj.terminPlatnosci;
        expect(terminPlatnosci).toEqual(Number)
    })

    test('dataUslugi', () => {
        const dataUslugi = Faktura.schema.obj.dataUslugi;
        expect(dataUslugi).toEqual(String)
    })

  })
})