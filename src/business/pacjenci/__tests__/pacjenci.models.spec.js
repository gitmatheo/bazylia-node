import { Pacjent } from '../pacjenci.models.js';
import mongoose from 'mongoose';

describe('Pacjent model', () => {
  describe('schema', () => {
    test('pacjentId', () => {
      const pacjentId = Pacjent.schema.obj.pacjentId
      expect(pacjentId).toEqual(mongoose.Schema.Types.ObjectId)
    })

    test('dataOrzeczenia', () => {
        const dataOrzeczenia = Pacjent.schema.obj.dataOrzeczenia;
        expect(dataOrzeczenia).toEqual(String)
    })

    test('dataOrzeczeniaUpdated', () => {
        const dataOrzeczeniaUpdated = Pacjent.schema.obj.dataOrzeczeniaUpdated;
        expect(dataOrzeczeniaUpdated).toEqual(Boolean)
    })

    test('decyzja', () => {
        const decyzja = Pacjent.schema.obj.decyzja;
        expect(decyzja).toEqual({
            type: String,
            enum : ['DECYZJA21', 'DECYZJA22', 'DECYZJA23', 'DECYZJA31', 'DECYZJA33', 'DECYZJA34', 'DECYZJA35'],
            default: 'DECYZJA21'
          })
    })

    test('decyzjaUpdated', () => {
        const decyzjaUpdated = Pacjent.schema.obj.decyzjaUpdated;
        expect(decyzjaUpdated).toEqual(Boolean)
    })

    test('firma', () => {
        const firma = Pacjent.schema.obj.firma;
        expect(firma).toEqual({
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firma'
        })
    })

    test('imie', () => {
        const imie = Pacjent.schema.obj.imie;
        expect(imie).toEqual({ type: String, required: true })
    })

    test('nazwisko', () => {
        const nazwisko = Pacjent.schema.obj.nazwisko;
        expect(nazwisko).toEqual({ type: String, required: true })
    })

    test('pesel', () => {
        const pesel = Pacjent.schema.obj.pesel;
        expect(pesel).toEqual({ type: String, required: true })
    })

    test('kodPocztowy', () => {
        const kodPocztowy = Pacjent.schema.obj.kodPocztowy;
        expect(kodPocztowy).toEqual(String)
    })

    test('miasto', () => {
        const miasto = Pacjent.schema.obj.miasto;
        expect(miasto).toEqual(String)
    })

    test('nazwaPracodawcy', () => {
        const nazwaPracodawcy = Pacjent.schema.obj.nazwaPracodawcy;
        expect(nazwaPracodawcy).toEqual(String)
    })

    test('nip', () => {
        const nip = Pacjent.schema.obj.nip;
        expect(nip).toEqual(String)
    })

    test('numerKarty', () => {
        const numerKarty = Pacjent.schema.obj.numerKarty;
        expect(numerKarty).toEqual(String)
    })

    test('numerTelefonu', () => {
        const numerTelefonu = Pacjent.schema.obj.numerTelefonu;
        expect(numerTelefonu).toEqual(String)
    })

    test('stanowisko', () => {
        const stanowisko = Pacjent.schema.obj.stanowisko;
        expect(stanowisko).toEqual(String)
    })

    test('ulica', () => {
        const ulica = Pacjent.schema.obj.ulica;
        expect(ulica).toEqual(String)
    })
  })
})