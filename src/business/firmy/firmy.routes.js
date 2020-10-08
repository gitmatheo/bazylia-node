
import express from 'express';
import controllers from './firmy.controllers.js';
const router = express.Router();

// /firmy
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /firmy/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router;
