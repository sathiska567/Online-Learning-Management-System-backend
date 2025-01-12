const express = require('express');
const { courseEnrollController, courseUnEnrollController, getOneStudentEnrollCoursesController } = require('../../controllers/courseEnrollController/courseEnrollController');

const router = express.Router();

// enroll route
router.post('/enroll', courseEnrollController);

// unenroll route
router.post('/unenroll', courseUnEnrollController);

// get one student enrolled courses
router.get('/enrolled/:student_id', getOneStudentEnrollCoursesController);

module.exports = router