import { crudControllers }from '../../utils/crud.js';
import { Faktura } from './faktury.models.js';
import { Wizyta } from '../wizyty/wizyty.models.js';
import { Firma } from '../firmy/firmy.models.js';
import mongodb from 'mongodb';
import buildMonthField from '../../utils/buildMonthField.js';
import replaceMongoIdWithCustomId from '../../utils/replace.js';

const { ObjectId } = mongodb;

export const  postFaktura = (id) => async (req, res) => {
    try {

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
    const date = new Date();

    try{
        let doc = await Faktura.findOne().sort({ field: 'asc', _id: -1 })

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

    if(wizyty[0].typWizyty == "SPECJALISTYKA") {
      return firmaStatic
    }

    if(wizyty[0].typWizyty == "MEDYCYNA_PRACY") {
      const allFirmaIdsAreEqual = wizyty.every( wizyta => JSON.stringify(wizyta.firmaId) === JSON.stringify(wizyty[0].firmaId) );
      if(!allFirmaIdsAreEqual) {
        res.status(400).json({message: "Zapytanie zawiera wizyty zarejestrowane dla różnych firm!"})
      } else {
          return firma;
        }
    }
    } catch (e) {
      console.error(e)
    }
  }
  
  const getSumaNetto = (wizyty, firma) => {
    if(wizyty[0].typWizyty == "MEDYCYNA_PRACY" && (firma.ryczalt!=0 && firma.ryczalt!=null)) {
      return parseFloat(firma.ryczalt).toFixed(2);
    } else {
      let sumaNetto = 0;
      wizyty.forEach((wizyta) => {
        sumaNetto += parseFloat(wizyta.usluga.cenaZwykla)
      })
      return parseFloat(sumaNetto).toFixed(2);
    }
  }
  
  const getSumaBrutto = (wizyty, firma) => {

    if(wizyty[0].typWizyty == "MEDYCYNA_PRACY" && (firma.ryczalt!=0 && firma.ryczalt!=null)) {
      return firma.ryczalt + (firma.ryczalt * vat);
    } else {
      let sum = 0;
      wizyty.forEach((wizyta) => {
        sum += parseFloat(wizyta.usluga.cenaZwykla) + (parseFloat(wizyta.usluga.cenaZwykla) * vat)
      })
      return parseFloat(sum).toFixed(2);
    }
  }
  
  const getUslugi = (wizyty) => {
    const uslugi = [];
    wizyty.forEach(wizyta => {
      uslugi.push(wizyta.usluga) 
    })
    return uslugi;
  }
  
  const getDataUslugi = (req) => {
    if(req.body.tylkoMiesiac == true) {
      return buildMonthField(req.body.dataSprzedazy)
    } else {
      return req.body.dataSprzedazy
    }
  }

export const  getFaktura = (id) => async (req, res) => {
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
        res.status(200).json({ ...doc })
      } catch (e) {
        console.error(e)
        res.status(400).end()
      }
}
    const getPlatnik = async (faktura) => {

      if(faktura.uslugi[0].typWizyty == "MEDYCYNA_PRACY") {
        const {nazwa, ulica, miasto, kodPocztowy,nip,email} = faktura.firma;
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
    
      const uslugi = faktura.uslugi
    
      const uslugiId= [];

      uslugi.forEach(usluga => {
        uslugiId.push(usluga.uslugaId);
      })
    
      const uniqueUslugiID = [...new Set(JSON.parse(JSON.stringify(uslugiId)))];
    
      const uniqueUslugi = [];
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
    
    export const getFaktury = ()=> async (req, res) => {
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


export default {
    getFaktury: getFaktury(),
    postFaktura: postFaktura("fakturaId"),
    getFaktura: getFaktura("fakturaId"),
    crudControllers: crudControllers(Faktura, "fakturaId")
}

