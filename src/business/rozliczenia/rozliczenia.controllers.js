
const mapToRozliczeinaDto = require('./rozliczenia.services');
const replaceMongoIdWithCustomId = require('../../utils/replace');

module.exports = getRozliczeniaMedycynaPracy = (id) => async (req, res) => {
    try {
        let wizyty = await Wizyta
                            .find({typWizyty: "MEDYCYNA_PRACY"})
                            .populate({ path: 'pacjent', model: Pacjent, populate: {
                                path: 'firma', model: Firma
                            }})

        let firmy = await Firma.find({})

        const firmyWithCustomId = [];
        firmy.forEach(firma => {
            firmyWithCustomId.push(replaceMongoIdWithCustomId(firma, "firmaId"));
        })

        const wizytyWithCustomId = [];
        wizyty.forEach(wizyta => {
            const newWizyta = {
                ...replaceMongoIdWithCustomId(wizyta, "wizytaId"),
                pacjent: replaceMongoIdWithCustomId(wizyta.pacjent, "pacjentId") }

            wizytyWithCustomId.push(newWizyta);
        })

        mapToRozliczeniaDto(firmyWithCustomId, wizytyWithCustomId).then(results => {
                    res.status(200).json( results )
        })

    } catch(e) {
        console.error(e)
        res.status(400)
    }

}


module.exports = getRozliczeniaSpecjalistyka = (id) => async (req, res) => {
    try {
        let wizyty = await Wizyta
                            .find({typWizyty: "SPECJALISTYKA"})
                            .populate({ path: 'pacjent', model: Pacjent, populate: {
                                path: 'firma', model: Firma
                            }})

        const wizytyWithCustomId = [];
        wizyty.forEach(wizyta => {
            const newWizyta = {
                ...replaceMongoIdWithCustomId(wizyta, "wizytaId"),
                pacjent: replaceMongoIdWithCustomId(wizyta.pacjent, "pacjentId") }

            wizytyWithCustomId.push(newWizyta);
        })

        mapToRozliczeniaSpecjalistyka(wizytyWithCustomId).then(results => {
                    res.status(200).json( results )
        })

    } catch(e) {
        console.error(e)
        res.status(400)
    }
}

module.exports = rozliczeniaControllers = {
    getRozliczeniaMedycynaPracy: getRozliczeniaMedycynaPracy(),
    getRozliczeniaSpecjalistyka: getRozliczeniaSpecjalistyka()
}