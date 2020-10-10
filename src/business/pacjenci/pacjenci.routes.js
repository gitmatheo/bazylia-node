import express from 'express';
import pacjenciControllers from './pacjenci.controllers.js';
const router = express.Router();

const { getPacjenci, updateDecyzja, updateDataOrzeczenia, crudControllers } = pacjenciControllers;

// /pacjenci
router
  .route('/')
  .get(getPacjenci)
  .post(crudControllers.createOne);

// /pacjenci/:id
router
  .route('/:id')
  .get(crudControllers.getOne)
  .put(crudControllers.updateOne)
  .delete(crudControllers.removeOne);

// /pacjenci/:id/decyzja
router.route('/:id/decyzja').post(updateDecyzja);

// /pacjenci/:id/data-orzeczenia
router.route('/:id/data-orzeczenia').post(updateDataOrzeczenia);

export default router;
