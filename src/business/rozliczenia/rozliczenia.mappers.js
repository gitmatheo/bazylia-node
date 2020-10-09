export const mapToFirmaDTO = (firma) => {

    const { _id, nazwa, ulica, miasto, kodPocztowy, nip, ryczalt, email } = firma;

    return {
        firmaId: _id,
        nazwa,
        ulica,
        miasto,
        kodPocztowy,
        nip,
        ryczalt,
        email
    }
}
