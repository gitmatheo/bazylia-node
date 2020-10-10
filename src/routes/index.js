import express from 'express';
import { signup, login, logout, protect } from '../utils/auth.js';
import pacjenciRouter from '../business/pacjenci/pacjenci.routes.js';
import firmyRouter from '../business/firmy/firmy.routes.js';
import uslugiRouter from '../business/uslugi/uslugi.routes.js';
import wizytyRouter from '../business/wizyty/wizyty.routes.js';
import rozliczeniaRouter from '../business/rozliczenia/rozliczenia.routes.js';
import fakturyRouter from '../business/faktury/faktury.routes.js';

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);

router.use('/pacjenci', protect, pacjenciRouter);
router.use('/firmy', protect, firmyRouter);
router.use('/uslugi', protect, uslugiRouter);
router.use('/wizyty', protect, wizytyRouter);
router.use('/rozliczenia', protect, rozliczeniaRouter);
router.use('/faktury', protect, fakturyRouter);

export default router;
