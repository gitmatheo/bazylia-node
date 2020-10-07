const express = require('express');
const uslugiControllers = require('./uslugi.controllers.js')
const router = express.Router();

const { getManyByType, crudControllers } = uslugiControllers;

// /uslugi
router
  .route('/')
  .get(crudControllers.getMany)

// /uslugi/medycyna-pracy
router
  .route('/:type')
  .get(getManyByType)

module.exports = router;