
const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('./src/business/user/user.models.js');
const Faktura = require('./src/business/faktury/faktury.models.js');
const Firma = require('./src/business/firmy/firmy.models.js');
const Pacjent = require('./src/business/pacjenci/pacjenci.models.js');
const Usluga = require('./src/business/uslugi/uslugi.models.js');
const Wizyta = require('./src/business/wizyty/wizyty.models.js');

const models = { User, Faktura, Firma, Pacjent, Usluga, Wizyta };
// const models = { User };

const {MongoMemoryServer} = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

const mongodbInMemoryServer = async () => {
  const url = await mongod.getUri();
  return url;
}


// const url ='mongodb+srv://matheo:Ognom%2C.%2F123@cluster0-exdv3.mongodb.net/bazylia-test?retryWrites=true&w=majority';

global.newId = () => {
  return mongoose.Types.ObjectId()
}

const remove = collection => {

    try {
        new Promise((resolve, reject) => {
            collection.remove(err => {
              if (err) return reject(err)
              resolve()
            })
          })
    } catch(e) {
        console.error(e)
    }


}


beforeEach(async done => {
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        await mongodbInMemoryServer(),
        {
          useNewUrlParser: true,
          // autoIndex: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        }
      )
      await clearDB()
      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      console.log('connection error')
      console.error(e)
      throw e
    }
  } else {
    await clearDB()
  }
  done()
})
afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})