const crudControllers = require('../../utils/crud');
const Firma = require('./firmy.models.js')

module.exports = crudControllers(Firma, "firmaId");




// //DANGEROUS !!!!
// router.post('/generate/:num', async (req , res ) => {
//   // if (req.params.num > 40) {
//   //   return res.status(400).json();
//   // }
//   let firmy = [];
//   const numberOfCompaniesToGenerate = req.params.num;

//   for (let id = 1; id <= numberOfCompaniesToGenerate; id++) {
//     firmy.push({
//       firmaId: uuidv4(),
//       email: faker.internet.email(),
//       kodPocztowy: faker.address.zipCode(),
//       miasto: faker.address.city(),
//       nazwa: faker.company.companyName(),
//       nip: faker.random.number().toString(),
//       ryczalt: faker.random.number(),
//       ulica: faker.address.streetAddress()
//     });
//   }

//   try {
//     Firma.collection.insert(firmy, function (err , docs ) {
//       if (err) {
//         return console.error(err);
//       } else {
//         console.log(`${req.params.num} documents inserted to the Collection`);
//       }
//     });
//     res.status(201).json({ firmy: firmy });
//   } catch {
//     res.status(400).json();
//   }
// });

// router.post('/delete-all', async (req , res ) => {
//   try {
//     Firma.collection.deleteMany(function (err , docs ) {});
//     res.status(201).json('Usunieto wszystko!!!');
//   } catch {
//     res.status(400).json();
//   }
// });