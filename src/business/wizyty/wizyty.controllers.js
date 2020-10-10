import { crudControllers } from '../../utils/crud.js';
import { Wizyta } from './wizyty.models.js';
import { Firma } from '../firmy/firmy.models.js';
import { Pacjent } from '../pacjenci/pacjenci.models.js';
import { mapToWizytaDTO, mapToWizytaMedycynaPracyEntity, mapToWizytaSpecjalistykaEntity } from './wizyty.mappers.js';
import mongodb from 'mongodb';

const { ObjectId } = mongodb;

export const getWizyty = () => async (req, res) => {
  try {
    let wizyty = await Wizyta.find({})
      .populate({
        path: 'pacjent',
        model: Pacjent,
        populate: {
          path: 'firma',
          model: Firma,
        },
      })
      .lean()
      .exec();

    wizyty = wizyty.map(wizyta => mapToWizytaDTO(wizyta));

    res.status(200).json(wizyty);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const postWizyta = () => async (req, res) => {
  try {
    const { pacjentId, firma } = req.body.pacjent;

    if (req.body.typWizyty === 'MEDYCYNA_PRACY') {
      let wizyta = await Wizyta.create(mapToWizytaMedycynaPracyEntity(req));

      await Pacjent.findByIdAndUpdate(
        { _id: pacjentId },
        { firma: firma ? ObjectId(firma.firmaId) : null, dataOrzeczeniaUpdated: false, decyzjaUpdated: false },
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.status(201).json(mapToWizytaDTO(wizyta));
          }
        },
      );
    }

    if (req.body.typWizyty === 'SPECJALISTYKA') {
      let wizyta = await Wizyta.create(mapToWizytaSpecjalistykaEntity(req));
      res.status(201).json(mapToWizytaDTO(wizyta));
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getIncomplete = () => async (req, res) => {
  try {
    let wizyty = await Wizyta.find({ typWizyty: 'MEDYCYNA_PRACY' })
      .populate({ path: 'pacjent', model: Pacjent })
      .lean()
      .exec();

    if (!wizyty) {
      return res.status(400).end();
    }

    let wizytyIncomplete = wizyty
      .map(wizyta => mapToWizytaDTO(wizyta))
      .filter(wizyta => !wizyta.pacjent.dataOrzeczeniaUpdated || !wizyta.pacjent.decyzjaUpdated);

    res.status(200).json(wizytyIncomplete);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getIncompleteCounter = () => async (req, res) => {
  try {
    let wizyty = await Wizyta.find({ typWizyty: 'MEDYCYNA_PRACY' })
      .populate({ path: 'pacjent', model: Pacjent })
      .lean()
      .exec();

    if (!wizyty) {
      return res.status(400).end();
    }

    let wizytyIncomplete = wizyty.filter(
      wizyta => !wizyta.pacjent.dataOrzeczeniaUpdated || !wizyta.pacjent.decyzjaUpdated,
    );

    res.status(200).json({ counter: wizytyIncomplete.length });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const wizytyControllers = {
  getWizyty: getWizyty(),
  postWizyta: postWizyta(),
  getIncomplete: getIncomplete(),
  getIncompleteCounter: getIncompleteCounter(),
  crudControllers: crudControllers(Wizyta, 'wizytaId'),
};
