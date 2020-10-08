
import { mapToRozliczeniaDto, mapToRozliczeniaSpecjalistyka } from './rozliczenia.services.js';
import replaceMongoIdWithCustomId from '../../utils/replace.js';
import { Wizyta } from '../wizyty/wizyty.models.js';
import { Pacjent } from '../pacjenci/pacjenci.models.js';
import { Firma } from '../firmy/firmy.models.js';

export const getRozliczeniaMedycynaPracy = (id) => async (req, res) => {
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

};

export const getRozliczeniaSpecjalistyka = (id) => async (req, res) => {
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
};

export default {
    getRozliczeniaMedycynaPracy: getRozliczeniaMedycynaPracy(),
    getRozliczeniaSpecjalistyka: getRozliczeniaSpecjalistyka()
};