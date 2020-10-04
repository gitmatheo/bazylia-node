const express = require('express');
const pacjenciControllers = require('./pacjenci.controllers.js')
const router = express.Router();

const {getPacjenci, updateDecyzja, crudControllers} = pacjenciControllers;

// /pacjenci
router
  .route('/')
  .get(getPacjenci)
  .post(crudControllers.createOne)

// /pacjenci/:id
router
  .route('/:id')
  .get(crudControllers.getOne)
  .put(crudControllers.updateOne)
  .delete(crudControllers.removeOne)

// /pacjenci/:id/decyzja
router
  .route('/:id/decyzja')
  .post(updateDecyzja)

// /pacjenci/:id/data-orzeczenia
router
  .route('/:id/data-orzeczenia')
  .post(crudControllers.updateOne)




















// router.get('/', (req, res, next) => {
//   Pacjent.find({}, (err, pacjenci) => {
//     if (err) {
//       res.send('oopsie something went wrong');
//       next();
//     }
//     res.json(pacjenci);
//   });
// });

// router.get('/:id', (req, res) => {
//   Pacjent.findOne(
//     { pacjentId: req.params.id },
//     async (err, pacjent) => {
//       try {
//         res.json(pacjent);
//       } catch (err) {
//         res.status(500).json({ message: err.message });
//       }
//     }
//   );
// });

// router.get('/:id', (req, res) => {
//   try {
//     const pacjent = Pacjent.findOne({ pacjentId: req.params.id });
//     res.json(pacjent);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/', async (req, res) => {
//   const pacjent = new Pacjent({
//     dataOrzeczenia: req.body.dataOrzeczenia,
//     dataOrzeczeniaUpdated: req.body.dataOrzeczeniaUpdated,
//     decyzja: req.body.decyzja,
//     decyzjaUpdated: req.body.decyzjaUpdated,
//     firma: {
//       email: req.body.email,
//       firmaId: uuidv4(),
//       kodPocztowy: req.body.kodPocztowy,
//       miasto: req.body.miasto,
//       nazwa: req.body.nazwa,
//       nip: req.body.nip,
//       ryczalt: req.body.ryczalt,
//       ulica: req.body.ulica
//     },
//     imie: req.body.imie,
//     kodPocztowy: req.body.kodPocztowy,
//     miasto: req.body.miasto,
//     nazwaPracodawcy: req.body.nazwaPracodawcy,
//     nazwisko: req.body.nazwisko,
//     nip: req.body.nip,
//     numerKarty: req.body.numerKarty,
//     numerTelefonu: req.body.numerTelefonu,
//     pacjentId: uuidv4(),
//     pesel: req.body.pesel,
//     stanowisko: req.body.stanowisko,
//     ulica: req.body.ulica
//   });

//   try {
//     const newPacjent = await pacjent.save();
//     res.status(201).json(newPacjent);
//   } catch {
//     res.status(400).json();
//   }
// });

// //Deleting One
// router.delete('/:id', async (req, res) => {
//   try {
//     await res.pacjent.remove(function (err) {
//       if (err) {
//         console.error('ERROR!');
//       }
//     });
//     res.json({ message: 'Usunięto pacjenta' });
//   } catch {
//     res.status(500).json({ message: res.message });
//   }
// });

// //UPDATE DATA ORZECZENIA
// router.post('/:id/data-orzeczenia', async (req, res) => {
//   Pacjent.findOne(
//     { pacjentId: req.params.id },
//     async (err, pacjent) => {
//       pacjent.dataOrzeczenia = req.body.dataOrzeczenia;
//       pacjent.dataOrzeczeniaUpdated = true;

//       try {
//         await pacjent.save(function (err) {
//           if (err) {
//             console.error('ERROR!');
//           }
//         });
//         res.json(pacjent);
//       } catch {
//         res.status(500).json({ message: err.message });
//       }
//     }
//   );
// });

// //UPDATE DATA ORZECZENIA
// router.post('/:id/decyzja', async (req, res) => {
//   Pacjent.findOne(
//     { pacjentId: req.params.id },
//     async (err, pacjent) => {
//       pacjent.decyzja = req.body.dataOrzeczenia;
//       pacjent.decyzjaUpdated = true;

//       try {
//         await pacjent.save(function (err) {
//           if (err) {
//             console.error('ERROR!');
//           }
//         });
//         res.json(pacjent);
//       } catch {
//         res.status(500).json({ message: err.message });
//       }
//     }
//   );
// });

//DANGEROUS !!!!
// router.post('/generate/:num', async (req, res) => {
//   if (req.paramsnum > 40) {
//     return res.status(400).json();
//   }
//   let pacjenci = [];
//   const numberOfCompaniesToGenerate = req.params.num;

//   for (let id = 1; id <= numberOfCompaniesToGenerate; id++) {
//     pacjenci.push({
//       dataOrzeczenia: faker.date.past(),
//       dataOrzeczeniaUpdated: getRandomInt(0, 10) > 5 ? true : false,
//       decyzja: faker.date.past(),
//       decyzjaUpdated: getRandomInt(0, 10) > 5 ? true : false,
//       firma: {
//         firmaId: uuidv4(),
//         email: faker.internet.email(),
//         kodPocztowy: faker.address.zipCode(),
//         miasto: faker.address.city(),
//         nazwa: faker.company.companyName(),
//         nip: faker.random.number().toString(),
//         ryczalt: faker.random.number(),
//         ulica: faker.address.streetAddress()
//       },
//       imie: faker.name.firstName(),
//       kodPocztowy: faker.address.zipCode(),
//       miasto: faker.address.city(),
//       nazwaPracodawcy: faker.company.companyName(),
//       nazwisko: faker.name.lastName(),
//       nip: faker.random.number(),
//       numerKarty: faker.random.number(),
//       numerTelefonu: faker.phone.phoneNumber(),
//       pacjentId: uuidv4(),
//       pesel: faker.random.number(),
//       stanowisko: faker.name.jobTitle(),
//       ulica: faker.address.streetAddress()
//     });
//   }

//   try {
//     Pacjent.collection.insert(pacjenci, function (err, docs) {
//       if (err) {
//         return console.error(err);
//       } else {
//         console.log(`${req.params.num} documents inserted to the Collection`);
//       }
//     });
//     res.status(201).json({ pacjenci: pacjenci });
//   } catch {
//     res.status(400).json();
//   }
// });

// router.post('/delete-all', async (req, res) => {
//   try {
//     Pacjent.collection.deleteMany(function (err, docs) {});
//     res.status(201).json('Usunieto wszystko!!!');
//   } catch {
//     res.status(400).json();
//   }
// });

// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }
module.exports = router;
  
