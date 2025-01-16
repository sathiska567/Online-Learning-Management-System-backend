const Course = require('../../models/courseModel/courseModel');

const courseCreateController = async (req, res) => {     
     console.log(req.body);
     
     try {
          const {
               teacherId,
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
          } = req.body;

          const newCourse = new Course({
               teacherId,
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
          const response = await Course.find({isApprove:true});

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

const getEachUserCreatedCourseController = async(req,res)=>{
     try {
       const {teacherId} = req.body;

       const createdCourse = await Course.find({teacherId:teacherId , isDeleted:false});

       res.status(200).send({
        success:true,
        message:"Course fetched successfully",
        data:createdCourse
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
     // console.log(req.body);
     
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


const courseDeleteController = async (req, res) => {
     try {
          const { id } = req.body

          const deleteResponse = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

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

const getCreatedOneCourseController = async (req, res) => {
     try {
          const { course_id } = req.params

          const response = await Course.findById(course_id)

          if (!response) {
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

const reviewRatingController = async (req, res) => {
     try {
          const { course_id, review, ratings, user_id } = req.body
          console.log(req.body);
          let totalRating = 0

          const course = await Course.findById(course_id)

          if (!course) {
               res.status(400).send({
                    success: false,
                    message: "Course not found"
               })
          }

          course.reviews.push({
               userId: user_id,
               reviewText: review,
               rating: ratings
          })

          for (let i = 0; i < course.reviews.length; i++) {
               totalRating += course.reviews[i].rating;
          }

          const overallRatings = totalRating / course.reviews.length;

          // console.log(overallRatings);

           course.overallRatings = overallRatings;
          await course.save()

          res.status(200).send({
               success: true,
               message: "Review and rating added successfully",
               data: course,
          })


     } catch (error) {
          res.status(400).send({
               success: false,
               message: "Error while getting course",
               error: error.message
          })
     }
}


const createdAllCourseWithCategory = async (req, res) => {
     try {
       const wedDevelopment = [];
       const mobileDevelopment = [];
       const Marketing = [];
       const MachineLearning = [];
       const Other = [];
       
       // Change these to let, so they can be updated
       let webEnrolStudent = 0;
       let mobileEnrolStudent = 0;
       let marketingEnrolStudent = 0;
       let machineLearningEnrolStudent = 0;
       let otherEnrolStudent = 0;
   
       const data = await Course.find({});
   
       for (let i = 0; i < data.length; i++) {
         if (data[i].category === 'Web Development') {
           wedDevelopment.push(data[i]);
         } else if (data[i].category === 'Mobile Development') {
           mobileDevelopment.push(data[i]);
         } else if (data[i].category === 'Machine Learning') {
           MachineLearning.push(data[i]);
         } else if (data[i].category === 'Marketing') {
           Marketing.push(data[i]);
         } else if (data[i].category === 'Other') {
           Other.push(data[i]);
         }
       }
   
       // Update the enrollment counts for each category
       for (let i = 0; i < wedDevelopment.length; i++) {
         webEnrolStudent += wedDevelopment[i].enrolledStudents.length;
       }
   
       // You can similarly count enrolled students for other categories as well
       for (let i = 0; i < mobileDevelopment.length; i++) {
         mobileEnrolStudent += mobileDevelopment[i].enrolledStudents.length;
       }
       
       for (let i = 0; i < Marketing.length; i++) {
         marketingEnrolStudent += Marketing[i].enrolledStudents.length;
       }
   
       for (let i = 0; i < MachineLearning.length; i++) {
         machineLearningEnrolStudent += MachineLearning[i].enrolledStudents.length;
       }
   
       for (let i = 0; i < Other.length; i++) {
         otherEnrolStudent += Other[i].enrolledStudents.length;
       }
   
       res.status(200).send({
         success: true,
         message: 'Courses found successfully',
         wedDevelopment,
         mobileDevelopment,
         MachineLearning,
         Marketing,
         Other,
         webEnrolStudent,
         mobileEnrolStudent,
         marketingEnrolStudent,
         machineLearningEnrolStudent,
         otherEnrolStudent
       });
   
     } catch (error) {
       res.status(400).send({
         success: false,
         message: 'Error while getting courses',
         error: error.message
       });
     }
   };
   
// set course progress
const setCourseProgressController = async(req,res)=>{
     try {
          const {course_id , progress} = req.body;
          const course = await Course.findByIdAndUpdate(course_id , {progress} , {new:true})

          res.status(200).send({
               success: true,
               message: "Course progress updated successfully",
               course
          })
       
       
     }catch (error) {
        res.status(400).send({
               success: false,
               message: "Error while getting course",
               error: error.message
        })
     }
     
   }

const getAllCoursesControllerWithoutApproval = async (req, res) => {
  try {
     const response = await Course.find({})

     res.status(200).send({
          success: true,
          message: "All courses",
          response
     })
     
  } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Error while getting courses',
        error: error.message
      })
  }
}

module.exports = { courseCreateController, getCreatedCourseController, updatedCreateCourseController, courseDeleteController, getCreatedOneCourseController, reviewRatingController,getEachUserCreatedCourseController,createdAllCourseWithCategory,setCourseProgressController,getAllCoursesControllerWithoutApproval };
