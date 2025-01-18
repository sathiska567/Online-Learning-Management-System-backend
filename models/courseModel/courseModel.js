const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
        teacherId:{
          type:String,
          required:true
        },
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
        reviews: [
           {
              userId: {
                 type: String,
                 ref: 'authModel',
                 required: false,
              },
              reviewText: {
                 type: String, 
                 required: false,
              },
              rating: {
                 type: Number,
                 min: 1,
                 max: 5,
              },
                },
              ],
        overallRatings:{
          type:Number,
          required:false,
          default:0
        },
        instructor: {
                type: String,
                required: false
        },
        duration: {
                type: String,
                required: false
        },
        isDeleted: {
                type: Boolean,
                default: false
        },
        isApprove: {
                type: Boolean,
                default: false
        },
        progress:{
           type:Number,
           required:false,
           default:0
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
