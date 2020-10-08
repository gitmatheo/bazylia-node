import { Firma } from '../firmy.models.js';
import mongoose from 'mongoose';

describe('Firma model', () => {
  describe('schema', () => {
    test('firmaId', () => {
      const firmaId = Firma.schema.obj.firmaId
      expect(firmaId).toEqual(mongoose.Schema.Types.ObjectId)
    })

    test('email', () => {
        const email = Firma.schema.obj.email;
        expect(email).toEqual(String)
    })

    test('kodPocztowy', () => {
        const kodPocztowy = Firma.schema.obj.kodPocztowy;
        expect(kodPocztowy).toEqual(String)
    })

    test('miasto', () => {
        const miasto = Firma.schema.obj.miasto;
        expect(miasto).toEqual(String)
    })

    test('nazwa', () => {
        const nazwa = Firma.schema.obj.nazwa;
        expect(nazwa).toEqual(String)
    })

    test('nip', () => {
        const nip = Firma.schema.obj.nip;
        expect(nip).toEqual(String)
    })

    test('ryczalt', () => {
        const ryczalt = Firma.schema.obj.ryczalt;
        expect(ryczalt).toEqual(Number)
    })

    test('ulica', () => {
        const ulica = Firma.schema.obj.ulica;
        expect(ulica).toEqual(String)
    })
  })
})