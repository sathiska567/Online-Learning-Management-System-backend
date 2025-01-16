const express = require('express');
const {authLoginController, authRegisterController, getCurrentUserController, getAllTeachersController } = require('../../controllers/authController/authController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();


// set register controller
router.post("/register",authRegisterController)

// set login controller
router.post("/login",authLoginController)

// get current user
router.get('/getCurrentUser',authMiddleware,getCurrentUserController)

// get all courses
router.get('/allTeachers',getAllTeachersController)


module.exports = router;