export const mapToPacjentDTO = pacjent => {
  const {
    imie,
    nazwisko,
    pesel,
    numerKarty,
    ulica,
    miasto,
    kodPocztowy,
    numerTelefonu,
    nip,
    nazwaPracodwacy,
    firma,
    stanowisko,
    email,
    dataOrzeczenia,
    decyzjaUpdated,
    decyzja,
  } = pacjent;

  return {
    pacjentId: pacjent._id,
    imie,
    nazwisko,
    pesel,
    numerKarty,
    ulica,
    miasto,
    kodPocztowy,
    numerTelefonu,
    nip,
    firma: firma
      ? {
          firmaId: firma._id || '',
          nazwa: firma.nazwa,
          ulica: firma.ulica,
          miasto: firma.miasto,
          kodPocztowy: firma.kodPocztowy,
          nip: firma.nip,
          ryczalt: firma.ryczalt,
          email: firma.email,
        }
      : null,
    nazwaPracodwacy,
    stanowisko,
    email,
    dataOrzeczenia,
    decyzjaUpdated,
    decyzja,
  };
};
