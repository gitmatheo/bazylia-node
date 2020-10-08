// import {getOne, getMany, removeOne, updateOne, createOne} from'../crud.js';

// import { Pacjent } from '../../business/pacjenci/pacjenci.models.js';
// import User from '../../business/user/user.models.js';
// import mongoose from 'mongoose';


// describe('crud controllers', () => {
//   describe('getOne', async () => {
//     test('finds one patient', async () => {
//       expect.assertions(2)

//       const pacjent = await Pacjent.create({ imie: 'Adam', nazwisko: 'Nowak', pesel: 65011946932  })

//       const req = {
//         params: {
//           id: pacjent._id
//         }
//       }


//       const res = {
//         status(status) {
//           expect(status).toBe(200)
//           return this
//         },
//         json(result) {
//           expect(result.data.pacjentId.toString()).toBe(pacjent._id.toString())
//         }
//       }

//       await getOne(Pacjent, "pacjentId")(req, res)
//     })

//     test('404 if no doc was found', async () => {
//       expect.assertions(2)

//       const req = {
//         params: {
//           id: mongoose.Types.ObjectId()
//         },
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(400)
//           return this
//         },
//         end() {
//           expect(true).toBe(true)
//         }
//       }

//       await getOne(Pacjent, "pacjentId")(req, res)
//     })
//   })

//   describe('getMany', () => {
//     test('finds array of docs by authenticated user', async () => {
//       expect.assertions(4)

//       const user = mongoose.Types.ObjectId()
//       await Pacjent.create([
//         { name: 'list', createdBy: user },
//         { name: 'other', createdBy: user },
//         { name: 'list', createdBy: mongoose.Types.ObjectId() }
//       ])

//       const req = {
//         user: {
//           _id: user
//         }
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(200)
//           return this
//         },
//         json(result) {
//           expect(result.data).toHaveLength(2)
//           result.data.forEach(doc => expect(`${doc.createdBy}`).toBe(`${user}`))
//         }
//       }

//       await getMany(Pacjent)(req, res)
//     })
//   })

//   describe('createOne', () => {
//     test('creates a new doc', async () => {
//       expect.assertions(2)

//       const user = mongoose.Types.ObjectId()
//       const body = { name: 'name' }

//       const req = {
//         user: { _id: user },
//         body
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(201)
//           return this
//         },
//         json(results) {
//           expect(results.data.name).toBe(body.name)
//         }
//       }

//       await createOne(Pacjent)(req, res)
//     })

//     test('createdBy should be the authenticated user', async () => {
//       expect.assertions(2)

//       const user = mongoose.Types.ObjectId()
//       const body = { name: 'name' }

//       const req = {
//         user: { _id: user },
//         body
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(201)
//           return this
//         },
//         json(results) {
//           expect(`${results.data.createdBy}`).toBe(`${user}`)
//         }
//       }

//       await createOne(Pacjent)(req, res)
//     })
//   })

//   describe('updateOne', () => {
//     test('finds doc by authenticated user and id to update', async () => {
//       expect.assertions(3)

//       const user = mongoose.Types.ObjectId()
//       const list = await Pacjent.create({ name: 'name', createdBy: user })
//       const update = { name: 'hello' }

//       const req = {
//         params: { id: list._id },
//         user: { _id: user },
//         body: update
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(200)
//           return this
//         },
//         json(results) {
//           expect(`${results.data._id}`).toBe(`${list._id}`)
//           expect(results.data.name).toBe(update.name)
//         }
//       }

//       await updateOne(Pacjent)(req, res)
//     })

//     test('400 if no doc', async () => {
//       expect.assertions(2)

//       const user = mongoose.Types.ObjectId()
//       const update = { name: 'hello' }

//       const req = {
//         params: { id: mongoose.Types.ObjectId() },
//         user: { _id: user },
//         body: update
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(400)
//           return this
//         },
//         end() {
//           expect(true).toBe(true)
//         }
//       }

//       await updateOne(Pacjent)(req, res)
//     })
//   })

//   describe('removeOne', () => {
//     test('first doc by authenticated user and id to remove', async () => {
//       expect.assertions(2)

//       const user = mongoose.Types.ObjectId()
//       const list = await Pacjent.create({ name: 'name', createdBy: user })

//       const req = {
//         params: { id: list._id },
//         user: { _id: user }
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(200)
//           return this
//         },
//         json(results) {
//           expect(`${results.data._id}`).toBe(`${list._id}`)
//         }
//       }

//       await removeOne(Pacjent)(req, res)
//     })

//     test('400 if no doc', async () => {
//       expect.assertions(2)
//       const user = mongoose.Types.ObjectId()

//       const req = {
//         params: { id: mongoose.Types.ObjectId() },
//         user: { _id: user }
//       }

//       const res = {
//         status(status) {
//           expect(status).toBe(400)
//           return this
//         },
//         end() {
//           expect(true).toBe(true)
//         }
//       }

//       await removeOne(Pacjent)(req, res)
//     })
//   })
// })
