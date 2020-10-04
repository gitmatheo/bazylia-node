const faker = require('faker');
const fs = require('fs');

function generateFirmy(numberOfCompaniesToGenerate) {
  let firmy = [];

  for (let id = 1; id <= numberOfCompaniesToGenerate; id++) {
    firmy.push({
      email: faker.internet.email(),
      kodPocztowy: faker.address.zipCode(),
      miasto: faker.address.city(),
      nazwa: faker.company.companyName(),
      nip: toString(faker.random.number()),
      ryczalt: faker.random.number(),
      ulica: faker.address.streetAddress()
    });
  }

  return { firmy: firmy };
}

let dataObj = generateFirmy(2);

fs.writeFileSync('firmy.json', JSON.stringify(dataObj, null, '\t'));
