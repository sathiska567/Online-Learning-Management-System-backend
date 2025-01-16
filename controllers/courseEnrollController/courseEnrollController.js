const Course = require("../../models/courseModel/courseModel")


const courseEnrollController = async(req,res)=>{
        try {
          console.log(req.body);
          
          const {course_id , student_id} = req.body

          const course = await Course.findById(course_id)

          if(!course){
            return res.status(200).send({
                success:false,
                message:"Course not found"
            })
          }
          if(course.enrolledStudents.includes(student_id)){
            return res.status(200).send({
                success:false,
                message:"You have already enrolled in this course"
            })
          }

          if(course.isApprove == false){
            return res.status(400).send({
                success:false,
                message:"Course is not approved by admin"
            })
          }
          
          course.enrolledStudents.push(student_id)
          await course.save()

          res.status(200).send({
            success:true,
            message:"Course enrolled successfully"
          })
                
        } catch (error) {
             res.status(200).send({
                 success:false,
                 message:"Something went wrong when enrolling course",
                 error:error.message
             })   
        }
}

const courseUnEnrollController = async(req,res)=>{
        try {
          const {course_id , student_id} = req.body

          const course = await Course.findById(course_id)

          if(!course){
            return res.status(200).send({
                success:false,
                message:"Course not found"
            })
          }
          if(!course.enrolledStudents.includes(student_id)){
            return res.status(200).send()
        }

        course.enrolledStudents = course.enrolledStudents.filter((id)=>id !== student_id)
        await course.save()

        res.status(200).send({
            success:true,
            message:"Course unEnrolled successfully"
        })

}
 catch(err){
        res.status(400).send({
            success:false,
            message:"Something went wrong when unEnrolling course",
        })
 }

}

const getOneStudentEnrollCoursesController = async(req,res)=>{
        try {
            const {student_id} = req.params
            console.log(student_id);
            

            const allCourses = await Course.find({})
 
            const courses = allCourses.filter((course)=>course.enrolledStudents.includes(student_id))
            if(courses.length === 0){
                return res.status(200).send({
                    success:true,
                    message:"No courses found"
                })
            }

            res.status(200).send({
                success:true,
                message:"Courses fetched successfully",
                data:courses
            })

        } catch (error) {
            res.status(400).send({
                success:false,
            })
}
}

module.exports = {courseEnrollController , courseUnEnrollController , getOneStudentEnrollCoursesController}