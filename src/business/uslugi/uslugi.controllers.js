const crudControllers = require('../../utils/crud');
const Usluga = require('./uslugi.models.js')

module.exports = getManyByType = () => async (req, res) => {
    try {
        let docs = await Usluga
        .find({typWizyty: changeStringToProperTypWizyty(req.params.type)})
        .lean()
        .exec()
        if (!docs) {
        return res.status(400).end()
        }
        let newDocs = [];

        docs.forEach(doc => {
        newDocs.push(replaceMongoIdWithCustomId(doc, "uslugaId"));
        })

        res.status(200).json([...newDocs ])
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const changeStringToProperTypWizyty = (type) => {
    return type.toUpperCase().replace(/-/g, '_');
}

module.exports = {
    getManyByType: getManyByType(),
    crudControllers: crudControllers(Usluga, "uslugaId"),
}
