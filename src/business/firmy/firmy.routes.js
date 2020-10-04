
const express = require('express');
const controllers = require('./firmy.controllers')
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

module.exports = router;
