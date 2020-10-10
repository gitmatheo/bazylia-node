import buildMonthField from '../../utils/buildMonthField.js';
import { Faktura } from './faktury.models.js';
import { Wizyta } from '../wizyty/wizyty.models.js';
import { Pacjent } from '../pacjenci/pacjenci.models.js';

import mongodb from 'mongodb';
const { ObjectId } = mongodb;

export const getNumerFaktury = async () => {
  const date = new Date();

  try {
    let doc = await Faktura.findOne().sort({ field: 'asc', _id: -1 });

    if (!doc) {
      return `1/${date.getMonth()}/${date.getFullYear()}`;
    } else {
      return `${parseInt(doc.numerFaktury[0]) + 1}/${date.getMonth()}/${date.getFullYear()}`;
    }
  } catch {
    return `1/${date.getMonth()}/${date.getFullYear()}`;
  }
};

export const getFirma = async (wizyty, res, firma) => {
  const firmaStatic = {
    id: '',
    firmaSourceId: '',
    nazwa: '',
    ulica: '',
    miasto: '',
    kodPocztowy: '',
    nip: '',
    rabat: '',
    ryczalt: '',
    email: '',
  };

  try {
    if (wizyty[0].typWizyty == 'SPECJALISTYKA') {
      return firmaStatic;
    }

    if (wizyty[0].typWizyty == 'MEDYCYNA_PRACY') {
      const allFirmaIdsAreEqual = wizyty.every(
        wizyta => JSON.stringify(wizyta.firmaId) === JSON.stringify(wizyty[0].firmaId),
      );
      if (!allFirmaIdsAreEqual) {
        res.status(400).json({
          message: 'Zapytanie zawiera wizyty zarejestrowane dla różnych firm!',
        });
      } else {
        return firma;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const getSumaNetto = (wizyty, firma) => {
  if (wizyty[0].typWizyty == 'MEDYCYNA_PRACY' && firma.ryczalt != 0 && firma.ryczalt != null) {
    return parseFloat(firma.ryczalt).toFixed(2);
  } else {
    let sumaNetto = 0;
    wizyty.forEach(wizyta => {
      sumaNetto += parseFloat(wizyta.usluga.cenaZwykla);
    });
    return parseFloat(sumaNetto).toFixed(2);
  }
};

export const getSumaBrutto = (wizyty, firma) => {
  const vat = 0.23;
  if (wizyty[0].typWizyty == 'MEDYCYNA_PRACY' && firma.ryczalt != 0 && firma.ryczalt != null) {
    return firma.ryczalt + firma.ryczalt * vat;
  } else {
    let sum = 0;
    wizyty.forEach(wizyta => {
      sum += parseFloat(wizyta.usluga.cenaZwykla) + parseFloat(wizyta.usluga.cenaZwykla) * vat;
    });
    return parseFloat(sum).toFixed(2);
  }
};

export const getUslugi = wizyty => {
  const uslugi = [];
  wizyty.forEach(wizyta => {
    uslugi.push(wizyta.usluga);
  });
  return uslugi;
};

export const getDataUslugi = req => {
  if (req.body.tylkoMiesiac) {
    return buildMonthField(req.body.dataSprzedazy);
  } else {
    return req.body.dataSprzedazy;
  }
};

export const getPlatnik = async faktura => {
  if (faktura.uslugi[0].typWizyty == 'MEDYCYNA_PRACY') {
    const { nazwa, ulica, miasto, kodPocztowy, nip, email } = faktura.firma;
    return {
      nazwa,
      ulica,
      miasto,
      kodPocztowy,
      nip,
      email,
    };
  }

  if (faktura.uslugi[0].typWizyty == 'SPECJALISTYKA') {
    let wizyta = await Wizyta.find({ faktura: ObjectId(faktura._id) })
      .lean()
      .exec();

    const pacjentId = wizyta[0].pacjent;

    let pacjent = await Pacjent.findById(ObjectId(pacjentId));

    const { imie, nazwisko, ulica, miasto, kodPocztowy, nip, email } = pacjent;

    return {
      nazwa: `${imie} ${nazwisko}`,
      ulica,
      miasto,
      kodPocztowy,
      nip,
      email,
    };
  }
};
export const getUslugiDlaFaktury = async faktura => {
  if (faktura.firma.ryczalt && faktura.firma.ryczalt != 0) {
    return [
      {
        cenaNetto: faktura.firma.ryczalt,
        stawkaVat: 23,
        pkwiu: null,
        nazwa: 'zryczaltowane uslugi medyczne',
        ilosc: 1,
      },
    ];
  }

  if (!faktura.firma.ryczalt) {
    const uslugi = faktura.uslugi;
    const uslugiId = uslugi.map(usluga => usluga.uslugaId);
    const uniqueUslugiID = [...new Set(JSON.parse(JSON.stringify(uslugiId)))];

    const uniqueUslugi = [];
    uniqueUslugiID.forEach(id => {
      uniqueUslugi.push(
        uslugi.find(usluga => {
          return usluga.uslugaId == id;
        }),
      );
    });
    const mappedUslugi = uniqueUslugi.map(usluga => {
      let ilosc = uslugi.filter(element => JSON.stringify(element.uslugaId) === JSON.stringify(usluga.uslugaId));
      return {
        nazwa: usluga.nazwa,
        cenaNetto: usluga.cenaZwykla,
        pkwiu: usluga.pkwiu,
        stawkaVat: usluga.stawkaVat,
        ilosc: ilosc.length,
      };
    });

    return mappedUslugi;
  }
};
