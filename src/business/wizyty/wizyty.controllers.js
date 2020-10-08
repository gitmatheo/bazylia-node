import { crudControllers }from '../../utils/crud.js';
import { Wizyta } from './wizyty.models.js';
import { Firma } from '../firmy/firmy.models.js';
import { Pacjent } from '../pacjenci/pacjenci.models.js';
import replaceMongoIdWithCustomId from '../../utils/replace.js';
import mongodb  from 'mongodb';

const { ObjectId } = mongodb;

export const getWizyty = ()=> async (req, res) => {
    try {
      let docs = await Wizyta
        .find({})
        .populate({ path: 'pacjent', model: Pacjent, populate: {
            path: 'firma', model: Firma
        }})
        .lean()
        .exec()
  
      let docsWithCustomId = []
  
      docs.forEach(doc => {
        docsWithCustomId.push({...replaceMongoIdWithCustomId(doc, "wizytaId"),
        pacjent: replaceMongoIdWithCustomId(doc.pacjent, "pacjentId")
      });
      })
  
      res.status(200).json([...docsWithCustomId] )
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  };

export const postWizyta = () => async (req, res) => {
    try {

        if(req.body.typWizyty === "MEDYCYNA_PRACY") {
        let doc = await Wizyta.create({ ...req.body,
            pacjent: ObjectId(req.body.pacjent.pacjentId),
            firmaId: ObjectId(req.body.pacjent.firma.firmaId),
        })

        let doc2 = await Pacjent.findByIdAndUpdate(
            { _id: req.body.pacjent.pacjentId },
            { firma: req.body.pacjent.firma ? ObjectId(req.body.pacjent.firma.firmaId) : null,
                dataOrzeczeniaUpdated: false,
                decyzjaUpdated: false},
            function(err, result) {
            if (err) {
                res.send(err);
            } else {
                doc = replaceMongoIdWithCustomId(doc, "wizytaId")
                res.status(201).json({...doc})
            }
            }
        )
        } else {

        let doc = await Wizyta.create({ ...req.body,
            pacjent: ObjectId(req.body.pacjent.pacjentId)
        })

        doc = replaceMongoIdWithCustomId(doc, "wizytaId")
        res.status(201).json({...doc})
        }
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
};

export const getIncomplete = () => async (req, res) => {
    try {
    let docs = await Wizyta
                .find({typWizyty: "MEDYCYNA_PRACY"})
                .populate({ path: 'pacjent', model: Pacjent})
                .lean()
                .exec()

        if (!docs) {
        return res.status(400).end()
        }

        let newDocs=[];
        docs.forEach(doc => {
            if(!doc.pacjent.dataOrzeczeniaUpdated || !doc.pacjent.decyzjaUpdated ) {
                newDocs.push({...replaceMongoIdWithCustomId(doc, "wizytaId"),
                        pacjent: replaceMongoIdWithCustomId(doc.pacjent, "pacjentId")})
            }
        })

    res.status(200).json([ ...newDocs])

    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
};

export const getIncompleteCounter = () => async (req, res) => {
    try {
    let docs = await Wizyta
                .find({typWizyty: "MEDYCYNA_PRACY"})
                .populate({ path: 'pacjent', model: Pacjent})
                .lean()
                .exec()

        if (!docs) {
        return res.status(400).end()
        }

        let newDocs=[];
        docs.forEach(doc => {
            if(!doc.pacjent.dataOrzeczeniaUpdated || !doc.pacjent.decyzjaUpdated ) {
                newDocs.push(doc)
            }
        })

    res.status(200).json({counter: newDocs.length})

    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
};

export const wizytyControllers = {
    getWizyty: getWizyty(),
    postWizyta: postWizyta(),
    getIncomplete: getIncomplete(),
    getIncompleteCounter: getIncompleteCounter(),
    crudControllers: crudControllers(Wizyta, "wizytaId")
}