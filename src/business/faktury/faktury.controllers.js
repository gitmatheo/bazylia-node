const crudControllers = require('../../utils/crud');
const Fakura = require('./faktury.models.js')
const { ObjectId } = require('mongodb');
const buildMonthField = require('../../utils/buildMonthField');

module.exports =  postFaktura = (id) => async (req, res) => {
    try {
      // 1. pobierz z db wszystkie wizyty z requestu i sprawdź czy któraś z nich ma pole faktura wypełnione, jeśli tak - odpowiedz z http 409
      let objIds = req.body.wizyty.map(id => ObjectId(id));
      const wizyty = await Wizyta.find({_id: {$in: objIds}})
                                  .lean()
                                  .exec();
      wizyty.forEach(wizyta => {
          if(wizyta.faktura || wizyta.faktura.length) {
            res.status(409).end()
          }
      })
  
      const firma = await Firma.findById(ObjectId(wizyty[0].firmaId)).lean().exec();
  
  
      const faktura = {
        dataFaktury: req.body.dataFaktury,
        numerFaktury: await getNumerFaktury(),
        firma: await getFirma(wizyty, res, firma),
        sposobPlatnosci:  req.body.sposobPlatnosci,
        sumaNetto: getSumaNetto(wizyty, firma),
        sumaBrutto: getSumaBrutto(wizyty, firma),
        terminPlatnosci: req.body.terminPlatnosci,
        uslugi: getUslugi(wizyty),
        dataUslugi: getDataUslugi(req),
       }
  
      let doc = await Faktura.create({...faktura});
  
  
      //update faktura with ID
      wizyty.forEach(async (wizyta) => {
  
        const wizytaUpdated = await Wizyta.findByIdAndUpdate(
          { _id: ObjectId(wizyta._id) },
          { faktura:  ObjectId(doc._id)})
          .lean()
          .exec();
      })
  
  
      doc = replaceMongoIdWithCustomId(doc, id)
  
      res.location('/faktury/' + doc.fakturaId)
      res.status(201).json({ ...doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  const getNumerFaktury = async () => {
    // *1 pobierz z db ostatnią fakturę, 
      // 	- jeśli nie ma jeszcze żadnej - zwróć numer faktury: 1/{bieżącyMiesiąc}/{bieżącyRok}
    // 	- jeśli jest już jakaś - zinkrementuj pierszą część numeru i dodaj /{bieżącyMiesiąc}/{bieżącyRok}
    const date = new Date();
   
    try{
        let doc = await Faktura.findOne().limit(1).lean().exec()
  
        if(!doc) {
          return `1/${date.getMonth()}/${date.getFullYear()}`
        } else {
          return `${parseInt(doc.numerFaktury[0]) + 1}/${date.getMonth()}/${date.getFullYear()}`
        }
  
    }catch{
      return `1/${date.getMonth()}/${date.getFullYear()}`;
    }
  }
  
  const getFirma = async (wizyty, res, firma) => {
    const firmaStatic = {
      id: '',
      firmaSourceId: '',
      nazwa: '',
      ulica: '',
      miasto: '',
      kodPocztowy: '',
      nip: '',
      rabat: '',
      ryczalt: '',
      email: '',
    }
  
    try {
    // *2 
    // - jeśli typWizyty==SPECJALISTYKA -> zwroc pusty obiekt FirmaStatic
    if(wizyty[0].typWizyty == "SPECJALISTYKA") {
      return firmaStatic
    }
    // - jesli MEDYCYNA_PRACY -> 
    if(wizyty[0].typWizyty == "MEDYCYNA_PRACY") {
      //   - wez wszystkie wizyty podane w requescie, sprawdz pole firmaId -> jeśli wszystkie nie są takie same wyrzuć http 400 ("Zapytanie zawiera wizyty zarejestrowane dla różnych firm!")
      const allFirmaIdsAreEqual = wizyty.every( wizyta => JSON.stringify(wizyta.firmaId) === JSON.stringify(wizyty[0].firmaId) );
      if(!allFirmaIdsAreEqual) {
        res.status(400).json({message: "Zapytanie zawiera wizyty zarejestrowane dla różnych firm!"})
      } else {
      //   - wez z jakiejkolwiek wizyty pole firmaId, znajdz tą firmę w bazie danych, i stwórz z tego statyczny
          return firma;
        }
    }
  
    } catch (e) {
      console.error(e)
    }
  }
  
  const getSumaNetto = (wizyty, firma) => {
      // - jeśli wizyty z requestu mają typWizyty==MEDYCYNA_PRACY && (FirmaStatic.ryczalt!=0 && FirmaStatic.ryczalt!=null) zwroc wartosc z FirmaStatic.ryczalt
      // - jeśli nie - wyciągnij z każdej wizyty pole wizyta.usluga.cenaZwykla i je zsumuj -> zwroc tą sume jako sumaNetto
    if(wizyty[0].typWizyty == "MEDYCYNA_PRACY" && (firma.ryczalt!=0 && firma.ryczalt!=null)) {
      console.log(firma.ryczalt);
      return parseFloat(firma.ryczalt).toFixed(2);
    } else {
      let sumaNetto = 0;
      wizyty.forEach((wizyta) => {
        sumaNetto += wizyta.usluga.cenaZwykla
      })
      return parseFloat(sumaNetto).toFixed(2);
    }
  }
  
  const getSumaBrutto = (wizyty, firma) => {
      // - jeśli wizyty z requestu mają typWizyty==MEDYCYNA_PRACY && (FirmaStatic.ryczalt!=0 && FirmaStatic.ryczalt!=null) zwroc wartosc z FirmaStatic.ryczalt +23%VAT
    // - jeśli nie - wyciągnij z każdej wizyty pole wizyta.usluga.cenaZwykla, dodaj do tego 23% VAT i to wszystko zsumuj
    const vat = 0.23;
    if(wizyty[0].typWizyty == "MEDYCYNA_PRACY" && (firma.ryczalt!=0 && firma.ryczalt!=null)) {
      return firma.ryczalt + (firma.ryczalt * vat);
    } else {
      let sum = 0;
      wizyty.forEach((wizyta) => {
        console.log("CCCCCCCCC")
        console.log(wizyta.usluga)
        sum += wizyta.usluga.cenaZwykla + (wizyta.usluga.cenaZwykla * vat)
      })
      console.log("HALO HALO")
      console.log(sum)
      return sum.toFixed(2);
    }
  }
  
  const getUslugi = (wizyty) => {
    // - wez wszystkie wizyty pobrane wczesniej z db, wyciągnij z nich pole usluga, zrob z tego listę i wstaw tą listę w faktura.uslugi
    const uslugi = [];
    wizyty.forEach(wizyta => {
      uslugi.push(wizyta.usluga) 
    })
    return uslugi;
  }
  
  const getDataUslugi = (req) => {
    // - jeśli request.tylkoMiesiac==true -> zwróć słownie nazwę miesiąca po polsku i rok na podstawie request.dataSprzedazy (np.: Styczeń-2020)
    // - jesli nie -> zwroc wartosc z faktura.dataSprzedazy
  
    if(req.body.tylkoMiesiac == true) {
      return buildMonthField(req.body.dataSprzedazy)
    } else {
      return req.body.dataSprzedazy
    }
  }

module.exports =  getFaktura = (id) => async (req, res) => {
    console.log("Get FAKTURA")
    console.log(id)
    console.log(req.params.id)
      try {
    
        let doc = await Faktura
          .findById(ObjectId(req.params.id))
          .lean()
          .exec()
    
        if (!doc) {
          return res.status(400).end()
        }
    
        const faktura = {
          ...doc,
          platnik: await getPlatnik(doc),
          uslugi: await getUslugiDlaFaktury(doc)
        }
    
    
        doc = replaceMongoIdWithCustomId(faktura, id)
        console.log("Hello doc")
        console.log({ ...doc })
    
        res.status(200).json({ ...doc })
      } catch (e) {
        console.error(e)
        res.status(400).end()
      }
    }
    
    const getPlatnik = async (faktura) => {
      if(faktura.uslugi[0].typWizyty == "MEDYCYNA_PRACY") {
        const {nazwa, ulica, miasto, kodPocztowy,nip,email} = faktura.firma.nazwa;
        return {
          nazwa,
          ulica,
          miasto,
          kodPocztowy,
          nip,
          email
        };
      }
    
      if(faktura.uslugi[0].typWizyty == "SPECJALISTYKA") {
    
        let wizyta = await Wizyta
        .find({ faktura: ObjectId(faktura._id)})
        .lean()
        .exec()
    
        console.log("SIEMAA SPECJALISTKA")
        console.log(wizyta[0].pacjent)
    
        const pacjentId = wizyta[0].pacjent;
    
        let pacjent = await Pacjent.findById(ObjectId(pacjentId));
    
        const {imie, nazwisko, ulica, miasto, kodPocztowy, nip, email} = pacjent;
    
        return {
          nazwa: `${imie} ${nazwisko}`,
          ulica,
          miasto,
          kodPocztowy,
          nip,
          email
        };
      }
    }
    
    const getUslugiDlaFaktury = async (faktura) => {
    
    if(faktura.firma.ryczalt != 0 && faktura.firma.ryczalt != null) {
      return [{
        cenaNetto: faktura.firma.ryczalt,
        stawkaVat: 23,
        pkwiu: null,
        nazwa: "zryczaltowane uslugi medyczne",
        ilosc: 1
      }]
    }
    
    
    if(!faktura.firma.ryczalt) {
    
      let uslugi = faktura.uslugi
    
      uslugiId= [];
      uslugi.forEach(usluga => {
        uslugiId.push(usluga.uslugaId);
      })
    
      let uniqueUslugiID = [...new Set(JSON.parse(JSON.stringify(uslugiId)))];
    
      uniqueUslugi = [];
      uniqueUslugiID.forEach(id => {
        uniqueUslugi.push(uslugi.find( (usluga) => {
          return usluga.uslugaId == id;
        }));
      })
    
    
      const mappedUslugi = uniqueUslugi.map(usluga => {
        let ilosc = uslugi.filter(element => JSON.stringify(element.uslugaId) === JSON.stringify(usluga.uslugaId));
        return {
          nazwa: usluga.nazwa,
          cenaNetto: usluga.cenaZwykla,
          pkwiu: usluga.pkwiu,
          stawkaVat: usluga.stawkaVat,
          ilosc: ilosc.length,
        }
      })
    
      return mappedUslugi;
    }
    
    }
    
    module.exports = getFaktury = ()=> async (req, res) => {
      try {
        let faktury = await Faktura
          .find({})
          .lean()
          .exec()
    
        let fakturyMapped = faktury.map(faktura => {
          return {
            fakturaId: faktura._id,
            numerFaktury: faktura.numerFaktury,
            firma: faktura.firma.nazwa,
            dataFaktury: faktura.dataFaktury,
            dataUslugi: faktura.dataUslugi
          }
    
        });
    
        res.status(200).json([...fakturyMapped] )
      } catch (e) {
        console.error(e)
        res.status(400).end()
      }
    }


module.exports = {
    getFaktury: getFaktury(),
    postFaktura: postFaktura("fakturaId"),
    getFaktura: getFaktura("fakturaId"),
    crudControllers: crudControllers(Fakura, "fakturaId")
}

module.exports
