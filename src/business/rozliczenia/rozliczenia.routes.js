import express from 'express';
import rozliczeniaControllers from './rozliczenia.controllers.js';
const router = express.Router();

// /rozliczenia/medycyna-pracy
router
  .route('/medycyna-pracy')
  .get(rozliczeniaControllers.getRozliczeniaMedycynaPracy)

// /rozliczenia/specjalistyka
router
  .route('/specjalistyka')
  .get(rozliczeniaControllers.getRozliczeniaSpecjalistyka)



export default router;