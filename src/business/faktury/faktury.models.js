const mongoose = require('mongoose');

// const generateFakturaDtoSchema = new mongoose.Schema({
//   dataFaktury: String,
//   dataSprzedazy: String,
//   sposobPlatnosci:  {
//     type: String,
//     enum : ['GOTOWKA', 'PRZELEW'],
//     default: 'GOTOWKA'
//   },
//   terminPlatnosci: String,
//   tylkoMiesiac: String,
//   wizyty: [String]
// });

// module.exports = mongoose.model(
//   'GenerateFaktura',
//   generateFakturaDtoSchema,
//   'generateFaktury'
// );
// module.exports.firmaSchema = firmaSchema;

// const PlatnikDtoSchema = new mongoose.Schema({
//   nazwa: String,
//   ulica: String,
//   miasto: String,
//   kodPocztowy: String,
//   nip: String,
//   email: String
// });

// const UslugaFakturaDtoSchema = new mongoose.Schema({
//   uslugaId: String,
//   nazwa: String,
//   cenaNetto: String,
//   stawkaVat: Number,
//   pkwiu: String || null,
//   ilosc: String
// });
const uslugiSubSchema = new mongoose.Schema(
  {
    uslugaId: mongoose.Schema.Types.ObjectId,
    cenaZwykla: Number,
    nazwa: String,
    typWizyty: String,
    pkwiu: String,
    stawkaVat: Number
  },
  {_id: false}
)
const FakturaSchema = new mongoose.Schema({
  fakturaId: mongoose.Schema.Types.ObjectId,
  dataFaktury: String,
  numerFaktury: String,
  // firma: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Firma'
  // },
  firma: {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    // firmaId:Schema.Types.ObjectId,
    kodPocztowy: String,
    miasto: String,
    nazwa: String,
    nip: String,
    ryczalt: Number,
    ulica: String
  },
  sposobPlatnosci:  {
    type: String,
    enum : ['GOTOWKA', 'PRZELEW'],
    default: 'GOTOWKA'
  },
  sumaNetto: String,
  sumaBrutto: String,
  terminPlatnosci: Number,
  uslugi: [uslugiSubSchema],
  dataUslugi: String,
});

module.exports = Faktura = mongoose.model('Faktura', FakturaSchema, 'faktury');


