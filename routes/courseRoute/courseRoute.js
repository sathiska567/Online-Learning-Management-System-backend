const express = require('express');
const { courseCreateController, getCreatedCourseController, updatedCreateCourseController, courseDeleteController, getCreatedOneCourseController, reviewRatingController } = require('../../controllers/courseController/courseController');

const router = express.Router();
const expressFormidable = require('express-formidable');


// create course
router.post('/create', expressFormidable({maxFileSize:5*1024*1024}) ,courseCreateController);

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