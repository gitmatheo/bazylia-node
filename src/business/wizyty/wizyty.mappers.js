import mongodb from 'mongodb';
const {ObjectId} = mongodb;

export const mapToWizytaDTO = (document) => {
    const wizyta = JSON.parse(JSON.stringify(document))
    const { imie, nazwisko, pesel, numerKarty, ulica, miasto, kodPocztowy, numerTelefonu, nip, nazwaPracodwacy, firma, stanowisko, email, dataOrzeczenia, dataOrzeczeniaUpdated, decyzja, decyzjaUpdated} = wizyta.pacjent;

    const pacjent = {
        pacjentId: wizyta.pacjent._id,
        imie,
        nazwisko,
        pesel,
        numerKarty,
        ulica,
        miasto,
        kodPocztowy,
        numerTelefonu,
        nip,
        firma: firma ? {
            firmaId: firma._id || "",
            nazwa: firma.nazwa,
            ulica: firma.ulica,
            miasto: firma.miasto,
            kodPocztowy: firma.kodPocztowy,
            nip: firma.nip,
            ryczalt: firma.ryczalt,
            email: firma.email
        } : null,
        nazwaPracodwacy,
        stanowisko,
        email,
        dataOrzeczenia,
        decyzjaUpdated,
        decyzja,
        dataOrzeczeniaUpdated,
    }

    return {
        wizytaId: wizyta._id,
        typWizyty: wizyta.typWizyty,
        rodzajBadan: wizyta.rodzajBadan,
        pacjent: {...pacjent},
        dataWizyty: wizyta.dataWizyty,
        usluga: wizyta.usluga,
        faktura: wizyta.faktura,
        firmaId: wizyta.firmaId
    }
}

export const mapToWizytaMedycynaPracyEntity = (req) => {
    return { ...req.body,
        pacjent: ObjectId(req.body.pacjent.pacjentId),
        firmaId: ObjectId(req.body.pacjent.firma.firmaId),
    }
}

export const mapToWizytaSpecjalistykaEntity = (req) => {
    return { ...req.body,
        pacjent: ObjectId(req.body.pacjent.pacjentId)
    }
}