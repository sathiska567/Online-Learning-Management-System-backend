const express = require('express');
const { courseRecommendationController } = require('../../controllers/courseRecommendationController/courseRecommendationController');
const router = express.Router();

// enroll route
router.post('/course', courseRecommendationController);


module.exports = router