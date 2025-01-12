const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
        title: {
                type: String,
                required: true
        },
        description: {
                type: String,
                required: true
        },
        imgLink: {
                type: String,
                required: false
        },
        category: {
                type: String,
                required: false
        },
        price: {
                type: Number,
                required: true
        },
        enrolledStudents: {
                type: [String],
                required: false,
                default: []
        },
        ratings: {
                type: Number,
                required: false
        },
        reviews: {
                type: [String],
                required: false
        },
        instructor: {
                type: String,
                required: false
        },
        duration: {
                type: String,
                required: false
        },
        idDeleted: {
                type: Boolean,
                default: false
        },
        isApprove: {
                type: Boolean,
                default: false
        },
        createdAt: {
                type: Date,
                default: Date.now
        },
        updatedAt: {
                type: Date,
                default: Date.now
        }
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
