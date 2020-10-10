import express from 'express';
import uslugiControllers from './uslugi.controllers.js';
const router = express.Router();

const { getManyByType, crudControllers } = uslugiControllers;

// /uslugi
router.route('/').get(crudControllers.getMany);

// /uslugi/medycyna-pracy
router.route('/:type').get(getManyByType);

export default router;
