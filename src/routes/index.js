const express = require('express');
const router = express.Router();

const {signup, login, logout, protect} = require('../utils/auth');

const pacjenciRouter = require('../business/pacjenci/pacjenci.routes');
const firmyRouter = require('../business/firmy/firmy.routes');
const uslugiRouter = require('../business/uslugi/uslugi.routes');
const wizytyRouter = require('../business/wizyty/wizyty.routes');
const rozliczeniaRouter = require('../business/rozliczenia/rozliczenia.routes');
const fakturyRouter = require('../business/faktury/faktury.routes');

router.use('/signup', signup)
router.use('/login', login)
router.use('/logout', logout)

router.use('/pacjenci',protect,  pacjenciRouter);
router.use('/firmy', protect, firmyRouter);
router.use('/uslugi', protect, uslugiRouter);
router.use('/wizyty', protect, wizytyRouter);
router.use('/rozliczenia', protect, rozliczeniaRouter);
router.use('/faktury', protect, fakturyRouter);

module.exports = router;

