import {
  getNumerFaktury,
  getFirma,
  getSumaNetto,
  getSumaBrutto,
  getUslugi,
  getDataUslugi,
  getPlatnik,
  getUslugiDlaFaktury,
} from './faktury.services.js';

export const mapToFakturaDTO = document => {
  const faktura = JSON.parse(JSON.stringify(document));
  return {
    fakturaId: faktura._id,
    numerFaktury: faktura.numerFaktury,
    firma: faktura.firma.nazwa,
    dataFaktury: faktura.dataFaktury,
    dataUslugi: faktura.dataUslugi,
  };
};

export const mapToSingleFakturaDTO = async document => {
  let faktura = JSON.parse(JSON.stringify(document));

  faktura = {
    ...faktura,
    fakturaId: faktura._id,
    platnik: await getPlatnik(faktura),
    uslugi: await getUslugiDlaFaktury(faktura),
  };

  delete faktura._id;

  return faktura;
};

export const mapToFakturaEntity = async (firma, wizyty, req, res) => ({
  dataFaktury: req.body.dataFaktury,
  numerFaktury: await getNumerFaktury(),
  firma: await getFirma(wizyty, res, firma),
  sposobPlatnosci: req.body.sposobPlatnosci,
  sumaNetto: getSumaNetto(wizyty, firma),
  sumaBrutto: getSumaBrutto(wizyty, firma),
  terminPlatnosci: req.body.terminPlatnosci,
  uslugi: getUslugi(wizyty),
  dataUslugi: getDataUslugi(req),
});
