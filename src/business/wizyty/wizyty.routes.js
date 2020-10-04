const express = require('express');
const wizytyControllers = require('./wizyty.controllers.js');
const router = express.Router();

const {postWizyta, getIncomplete, getIncompleteCounter, crudControllers, getWizyty } = wizytyControllers;

// /wizyty
router
  .route('/')
  .get(getWizyty)
  .post(postWizyta)

// /wizyty/incomplete
router
  .route('/incomplete/')
  .get(getIncomplete)

// /incomplete/counter
router
  .route('/incomplete/counter')
  .get(getIncompleteCounter)

// /wizyty/:id
router
  .route('/:id')
  .get(crudControllers.getOne)
  .put(crudControllers.updateOne)
  .delete(crudControllers.removeOne)





module.exports = router;
