const Course = require('../../models/courseModel/courseModel'); // Adjust the path as per your project structure

const courseCreateController = async (req, res) => {
     try {
          const {
               title,
               description,
               imgLink,
               category,
               price,
               enrolledStudents,
               ratings,
               reviews,
               instructor,
               duration,
               createdAt,
               updatedAt,
          } = req.body;

          const newCourse = new Course({
               title,
               description,
               imgLink,
               category,
               price,
               enrolledStudents,
               ratings,
               reviews,
               instructor,
               duration,
               createdAt,
               updatedAt,
          });

          await newCourse.save();

          res.status(201).send({
               success: true,
               message: "Course created successfully",
               course: newCourse,
          });
     } catch (error) {
          res.status(400).send({
               success: false,
               message: "Error while creating course",
               error: error.message,
          });
     }
};

const getCreatedCourseController = async (req, res) => {
     try {
          const response = await Course.find({});

          res.status(200).send({
               success: true,
               message: "Course fetched successfully",
               data: response
          })

     } catch (error) {
          res.status(400).send({
               success: false,
               message: "Error while getting course",
               error: error.message
          })
     }
}

const updatedCreateCourseController = async (req, res) => {
     try {
          const {
               id,
               title,
               description,
               imgLink,
               category,
               price,
               enrolledStudents,
               ratings,
               reviews,
               instructor,
               duration,
               createdAt,
               updatedAt,
          } = req.body;

          const response = await Course.findByIdAndUpdate(id, {
               title,
               description,
               imgLink,
               category,
               price,
               enrolledStudents,
               ratings,
               reviews,
               instructor,
               duration,
               createdAt,
               updatedAt,
          }, { new: true });

          res.status(200).send({
               success: true,
               message: "Course updated successfully",
               data: response
          })

     } catch (error) {
          res.status(400).send({
               success: false,
               message: "Error while updating course",
               error: error.message
          })
     }
}


const courseDeleteController = async(req,res)=>{
     try {
       const {id} = req.body

       const deleteResponse = await Course.findByIdAndUpdate(id, {idDeleted:true}, {new:true})

       res.status(200).send({
        success: true,
        message: "Course deleted successfully",
       })
          
     } catch (error) {
          res.status(400).send({
               success: false,
               message: "Error while deleting course",
               error: error.message
          })
     }
}


const getCreatedOneCourseController = async(req,res)=>{
  try {
    const {course_id} = req.params

    const response = await Course.findById(course_id)

    if(!response){
     res.status(400).send({
          success: false,
          message: "Course not found"
     })
    }

    res.status(200).send({
     success: true,
     message: "Course fetched successfully",
     data: response
    })
     

  } catch (error) {
     res.status(400).send({
          success: false,
          message: "Error while getting course",
          error: error.message
     })
  }
}

module.exports = { courseCreateController, getCreatedCourseController, updatedCreateCourseController , courseDeleteController,getCreatedOneCourseController };
