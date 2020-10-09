import { crudControllers }from '../../utils/crud.js';
import { Usluga } from './uslugi.models.js';
import { mapToUslugaDTO } from './uslugi.mappers.js'

export const getManyByType = () => async (req, res) => {
    try {
        let uslugi = await Usluga
            .find({typWizyty: changeStringToProperTypWizyty(req.params.type)})
            .lean()
            .exec()
        if (!uslugi) {
            return res.status(400).end()
        }

        uslugi = uslugi.map(usluga =>  mapToUslugaDTO(usluga))

        res.status(200).json(uslugi)
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
};

const changeStringToProperTypWizyty = (type) => {
    return type.toUpperCase().replace(/-/g, '_');
}

export default {
    getManyByType: getManyByType(),
    crudControllers: crudControllers(Usluga, "uslugaId"),
};
