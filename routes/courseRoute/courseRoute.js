const express = require('express');
const { courseCreateController, getCreatedCourseController, updatedCreateCourseController, courseDeleteController, getCreatedOneCourseController, reviewRatingController } = require('../../controllers/courseController/courseController');

const router = express.Router();


// create course
router.post('/create', courseCreateController);

// get Created All Course
router.get('/all', getCreatedCourseController);

// get one course details
router.get('/one-course/:course_id', getCreatedOneCourseController);

// course update route
router.post("/update",updatedCreateCourseController)

// Course Delete Route
router.post("/delete",courseDeleteController)


// course review and rating route
router.post("/review",reviewRatingController)

module.exports = router