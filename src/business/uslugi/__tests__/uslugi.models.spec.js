import { Usluga } from '../uslugi.models.js';
import mongoose from 'mongoose';

describe('Usluga model', () => {
  describe('schema', () => {
    test('uslugaId', () => {
      const uslugaId = Usluga.schema.obj.uslugaId;
      expect(uslugaId).toEqual(mongoose.Schema.Types.ObjectId);
    });

    test('cenaZwykla', () => {
      const cenaZwykla = Usluga.schema.obj.cenaZwykla;
      expect(cenaZwykla).toEqual(Number);
    });

    test('nazwa', () => {
      const nazwa = Usluga.schema.obj.nazwa;
      expect(nazwa).toEqual(String);
    });

    test('typWizyty', () => {
      const typWizyty = Usluga.schema.obj.typWizyty;
      expect(typWizyty).toEqual(String);
    });

    test('pkwiu', () => {
      const pkwiu = Usluga.schema.obj.pkwiu;
      expect(pkwiu).toEqual(String);
    });

    test('stawkaVat', () => {
      const stawkaVat = Usluga.schema.obj.stawkaVat;
      expect(stawkaVat).toEqual(Number);
    });
  });
});
