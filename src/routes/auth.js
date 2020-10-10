import express from 'express';
import { signup, login, logout } from '../utils/auth.js';
const router = express.Router();

// /signup
router.route('/').post(signup);

// /login
router.route('/').post(login);

// /logout
router.route('/').post(logout);

export default router;
