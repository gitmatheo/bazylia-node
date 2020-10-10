export const mapToUslugaDTO = usluga => {
  const { _id, nazwa, cenaZwykla, typWizyty, pkwiu, stawkaVat } = usluga;

  return {
    uslugaId: _id,
    nazwa,
    cenaZwykla,
    typWizyty,
    pkwiu,
    stawkaVat,
  };
};
