const express = require('express');
const { courseCreateController, getCreatedCourseController, updatedCreateCourseController, courseDeleteController, getCreatedOneCourseController, reviewRatingController, getEachUserCreatedCourseController, createdAllCourseWithCategory, setCourseProgressController, getAllCoursesControllerWithoutApproval } = require('../../controllers/courseController/courseController');

const router = express.Router();

// create course
router.post('/create',courseCreateController);

// get Created All Course
router.get('/all', getCreatedCourseController);

// get Created All Course without approval
router.get('/allCourse', getAllCoursesControllerWithoutApproval);

// get each user create course
router.post("/getCourse",getEachUserCreatedCourseController);

// get one course details
router.get('/one-course/:course_id', getCreatedOneCourseController);

// course update route
router.post("/update",updatedCreateCourseController)

// Course Delete Route
router.post("/delete",courseDeleteController)

// course review and rating route
router.post("/review",reviewRatingController)

// with category
router.get("/category",createdAllCourseWithCategory)

// set course progress
router.post('/setCourseProgress',setCourseProgressController)


module.exports = router