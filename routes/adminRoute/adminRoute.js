const express = require('express');
const { approveCourseController, TeacherRoleApproveController, getAllTeacherController, getAllStudentController, BannedUserController, approveCoursesController, removeApproveCoursesController } = require('../../controllers/adminController/adminController');

const router = express.Router();

// approve created course
router.post('/approveCourse', approveCourseController);

// approve teacher role
router.post('/approveTeacherRole', TeacherRoleApproveController);

// get all teacher
router.get('/getAllTeacher', getAllTeacherController);

// get all student
router.get('/getAllStudent', getAllStudentController);

// banned user
router.post('/bannedUser', BannedUserController);

// approve courses
router.post('/approveCourses', approveCoursesController);

// remove approval
router.post('/removeApproval', removeApproveCoursesController);

module.exports = router