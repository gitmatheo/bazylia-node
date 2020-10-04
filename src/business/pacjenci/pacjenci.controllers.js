const crudControllers = require('../../utils/crud');
const Pacjent = require('./pacjenci.models.js')
const { ObjectId } = require('mongodb');

module.exports = getPacjenci = (id) => async (req, res) => {
    try {
        let docs = await Pacjent
        .find({})
        .populate({ path: 'firma', model: Firma})
        .lean()
        .exec()

        let docsWithCustomId = []

        docs.forEach(doc => {
        docsWithCustomId.push(replaceMongoIdWithCustomId(doc, id));
        })

        res.status(200).json([...docsWithCustomId] )
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}


module.exports = updateDecyzja = () => async (req, res) => {
    try {
    let doc = await Pacjent
                .findByIdAndUpdate(
                { _id: ObjectId(req.params.id) },
                { decyzjaUpdated: true,
                    decyzja: req.body.decyzja
                    },
                )
                .lean()
                .exec()

        if (!doc) {
            return res.status(410).end()
        }

    res.status(200).end()

    } catch (e) {
    console.error(e)
    res.status(400).end()
    }
}

module.exports = updateDataOrzeczenia = () => async (req, res) => {
    try {
    let doc = await Pacjent
                .findByIdAndUpdate(
                { _id: ObjectId(req.params.id) },
                { dataOrzeczeniaUpdated: true,
                    dataOrzeczenia: req.body.dataOrzeczenia
                    },
                )
                .lean()
                .exec()

        if (!doc) {
            return res.status(410).end()
        }

    res.status(200).end()

    } catch (e) {
    console.error(e)
    res.status(400).end()
    }
}



module.exports = {
    getPacjenci: getPacjenci("pacjentId"),
    updateDecyzja: updateDecyzja(),
    updateDataOrzeczenia: updateDataOrzeczenia(),
    crudControllers: crudControllers(Pacjent, "pacjentId")
}
