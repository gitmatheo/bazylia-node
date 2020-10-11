import { crudControllers } from '../../utils/crud.js';
import { Pacjent } from './pacjenci.models.js';
import { Firma } from '../firmy/firmy.models.js';
import mongodb from 'mongodb';
import { mapToPacjentDTO } from './pacjenci.mappers.js';

const { ObjectId } = mongodb;
export const getPacjenci = () => async (req, res) => {
  try {
    let pacjenci = await Pacjent.find({})
      .populate({ path: 'firma', model: Firma })
      .lean()
      .exec();

    pacjenci = pacjenci.map(pacjent => mapToPacjentDTO(pacjent));

    res.status(200).json(pacjenci);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateDecyzja = () => async (req, res) => {
  try {
    let doc = await Pacjent.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      { decyzjaUpdated: true, decyzja: req.body.decyzja },
    )
      .lean()
      .exec();

    if (!doc) {
      return res.status(410).end();
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateDataOrzeczenia = () => async (req, res) => {
  try {
    let doc = await Pacjent.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      { dataOrzeczeniaUpdated: true, dataOrzeczenia: req.body.dataOrzeczenia },
    )
      .lean()
      .exec();

    if (!doc) {
      return res.status(410).end();
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  getPacjenci: getPacjenci(),
  updateDecyzja: updateDecyzja(),
  updateDataOrzeczenia: updateDataOrzeczenia(),
  crudControllers: crudControllers(Pacjent, 'pacjentId'),
};
