const crudControllers = require('../../utils/crud');
const Pacjent = require('./pacjenci.models.js')

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


module.exports = updateDecyzja = (id) => async (req, res) => {

    try {
    let docs = await Pacjent
                .findByIdAndUpdate(
                { _id: id },
                { decyzjaUpdated: true,
                    decyzja: req.body.decyzja
                    },
                function(err, result) {
                    if (err) {
                    res.send(err);
                    } else {
                    res.send(result);
                    }
                }
                )
                .lean()
                .exec()

        if (!docs) {
        return res.status(400).end()
        }
    let newDoc = [];

    docs.forEach(doc => {
        newDoc.push(replaceMongoIdWithCustomId(doc, doc._id));
    })

    res.status(200).json({counter: docs.length})

    } catch (e) {
    console.error(e)
    res.status(400).end()
    }
}



module.exports = {
    getPacjenci: getPacjenci("pacjentId"),
    updateDecyzja: updateDecyzja("pacjentId"),
    crudControllers: crudControllers(Pacjent, "pacjentId")
}
