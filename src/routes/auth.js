const express = require('express');
const {signup, login, logout} = require('../utils/auth.js')
const router = express.Router();



console.log("wwhaaa")
console.log(signup)
// /signup
router
  .route('/')
  .post(signup)

// /login
router
  .route('/')
  .post(login)
  
  // /logout
router
.route('/')
.post(logout)


  module.exports = router;