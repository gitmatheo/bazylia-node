import express from 'express';
// import crudControllers  from './wizyty.controllers.js';
// import { postWizyta, getIncomplete, getIncompleteCounter, getWizyty }  from './wizyty.controllers.js';

import { wizytyControllers } from './wizyty.controllers.js';

const { postWizyta, getIncomplete, getIncompleteCounter, getWizyty, crudControllers } = wizytyControllers;

const router = express.Router();

// /wizyty
router
  .route('/')
  .get(getWizyty)
  .post(postWizyta);

// /wizyty/incomplete
router.route('/incomplete/').get(getIncomplete);

// /incomplete/counter
router.route('/incomplete/counter').get(getIncompleteCounter);

// /wizyty/:id
router
  .route('/:id')
  .get(crudControllers.getOne)
  .put(crudControllers.updateOne)
  .delete(crudControllers.removeOne);

export default router;
