
import { mapToRozliczeniaMedycynaPracyDto, mapToRozliczeniaSpecjalistyka } from './rozliczenia.services.js';
import { Wizyta } from '../wizyty/wizyty.models.js';
import { Pacjent } from '../pacjenci/pacjenci.models.js';
import { Firma } from '../firmy/firmy.models.js';
import { mapToFirmaDTO } from './rozliczenia.mappers.js';
import { mapToWizytaDTO } from '../wizyty/wizyty.mappers.js';

export const getRozliczeniaMedycynaPracy = (id) => async (req, res) => {
    try {
        let wizyty = await Wizyta
                            .find({typWizyty: "MEDYCYNA_PRACY"})
                            .populate({ path: 'pacjent', model: Pacjent, populate: {
                                path: 'firma', model: Firma
                            }})

        let firmy = await Firma.find({})

        wizyty = wizyty.map(wizyta => mapToWizytaDTO(wizyta));

        firmy = firmy.map(firma=> mapToFirmaDTO(firma));

        mapToRozliczeniaMedycynaPracyDto(firmy, wizyty)
            .then(results => res.status(200).json(results))

    } catch(e) {
        console.error(e)
        res.status(400)
    }

};

export const getRozliczeniaSpecjalistyka = () => async (req, res) => {
    try {
        let wizyty = await Wizyta
                            .find({typWizyty: "SPECJALISTYKA"})
                            .populate({ path: 'pacjent', model: Pacjent, populate: {
                                path: 'firma', model: Firma
                            }})

        wizyty = wizyty.map(wizyta => mapToWizytaDTO(wizyta));

        mapToRozliczeniaSpecjalistyka(wizyty)
            .then(results => res.status(200).json(results));

    } catch(e) {
        console.error(e)
        res.status(400)
    }
};

export default {
    getRozliczeniaMedycynaPracy: getRozliczeniaMedycynaPracy(),
    getRozliczeniaSpecjalistyka: getRozliczeniaSpecjalistyka()
};