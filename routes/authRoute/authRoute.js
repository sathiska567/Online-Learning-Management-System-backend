const express = require('express');
const {authLoginController, authRegisterController } = require('../../controllers/authController/authController');

const router = express.Router();


// set register controller
router.post("/register",authRegisterController)

// set login controller
router.post("/login",authLoginController)


module.exports = router;