import mongodb from 'mongodb';
import { crudControllers } from '../../utils/crud.js';
import { Faktura } from './faktury.models.js';
import { Wizyta } from '../wizyty/wizyty.models.js';
import { Firma } from '../firmy/firmy.models.js';

import { mapToSingleFakturaDTO, mapToFakturaDTO, mapToFakturaEntity } from './faktury.mappers.js';

const { ObjectId } = mongodb;

export const postFaktura = () => async (req, res) => {
  try {
    const objIds = req.body.wizyty.map(id => ObjectId(id));
    const wizyty = await Wizyta.find({ _id: { $in: objIds } })
      .lean()
      .exec();
    wizyty.forEach(wizyta => {
      if (wizyta.faktura) {
        return res.status(409).end();
      }
    });

    const firma = await Firma.findById(ObjectId(wizyty[0].firmaId))
      .lean()
      .exec();

    let faktura = await mapToFakturaEntity(firma, wizyty, req, res);

    faktura = await Faktura.create(faktura);

    // update wizyta with fakturaID
    let wizytyUpdated = await wizyty.map(async wizyta => {
      return await Wizyta.findByIdAndUpdate({ _id: ObjectId(wizyta._id) }, { faktura: ObjectId(faktura._id) })
        .lean()
        .exec();
    });

    Promise.all(wizytyUpdated).then(async response => {
      faktura = await mapToSingleFakturaDTO(faktura);
      res.location(`/faktury/${faktura.fakturaId}`);
      res.status(201).json(faktura);
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getFaktura = () => async (req, res) => {
  try {
    let faktura = await Faktura.findById(ObjectId(req.params.id))
      .lean()
      .exec();

    if (!faktura) {
      return res.status(400).end();
    }

    faktura = await mapToSingleFakturaDTO(faktura);
    res.status(200).json(faktura);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getFaktury = () => async (req, res) => {
  try {
    let faktury = await Faktura.find({})
      .lean()
      .exec();

    faktury = faktury.map(faktura => mapToFakturaDTO(faktura));

    res.status(200).json(faktury);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  getFaktury: getFaktury(),
  postFaktura: postFaktura(),
  getFaktura: getFaktura(),
  crudControllers: crudControllers(Faktura, 'fakturaId'),
};
