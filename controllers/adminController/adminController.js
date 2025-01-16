const { authModel } = require("../../models/authModel/authModel");
const Course = require("../../models/courseModel/courseModel");


const approveCourseController= async(req,res)=>{
    try {
       const {course_id , isApprove} = req.body;
       if(!course_id){
        return res.status(400).json({
            success: false,
            message: "Course Id fields are required"
        })
       }
       const course = await Course.findById(course_id);

       if(!course){
        return res.status(400).json({
            success: false,
            message: "Course not found"
        })
       }

       course.isApprove = isApprove;
       await course.save();

       res.status(200).json({
        success: true,
        message: "Course approved successfully",
        course: course
       })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const TeacherRoleApproveController = async(req,res)=>{
    try {
        const {user_id , isTeacherVerified} = req.body;

        if(!user_id){
            return res.status(400).json({
                success: false,
                message: "User Id fields are required"
            })
        }

        const userResponse = await authModel.findById(user_id);

        if(!userResponse){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if(userResponse.isTeacher){
                userResponse.isTeacherVerified = isTeacherVerified;
                await userResponse.save();

        res.status(200).json({
                success: true,
                message: "User role approved successfully",
                user: userResponse
            })
        }

        else{
          res.status(400).send({
            success: false,
            message: "User is not a teacher"
          })
        }
        
    } catch (error) {
         res.status(400).send({
            success: false,
            message: error.message

         })
    }
}

const getAllTeacherController = async (req, res) => {
    try {
        const userResponse = await authModel.find({isTeacher: true});

        res.status(200).json({
            success: true,
            message: "Teachers fetched successfully",
            users: userResponse
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
 }
}

const getAllStudentController = async (req, res) => {
    try {
        const userResponse = await authModel.find({isStudent: true});

        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            users: userResponse
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
 }
}

const BannedUserController = async (req, res) => {
        try {
            const { user_id, isBlocked } = req.body;
    
            const userResponse = await authModel.findOne({ _id: user_id });
    
            if (!userResponse) {
                return res.status(400).send({
                    success: false,
                    message: "User not found"
                });
            }
    
            userResponse.isBlocked = isBlocked;
            await userResponse.save();
    
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                user: userResponse 
            });
    
        } catch (error) {
            res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
    

const approveCoursesController = async (req, res) => {
    try {
        console.log(req.body);
        
        const { course_id, isApproved } = req.body;

        const courseResponse = await Course.findOne({ _id: course_id });

        if (!courseResponse) {
            return res.status(400).send({
                success: false,
                message: "Course not found"
            });
        }

        courseResponse.isApprove = isApproved;
        courseResponse.isDeleted = false;
        await courseResponse.save();

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: courseResponse
        })

        

    }catch(err){
        res.status(400).send({
            success: false,
            message: err.message
        })
    }
}

const removeApproveCoursesController = async (req, res) => {
    try {
        const { course_id } = req.body;

        const courseResponse = await Course.findOne({ _id: course_id });

        if (!courseResponse) {
            return res.status(400).send({
                success: false,
                message: "Course not found"
            });
        }

        courseResponse.isApprove = false;
        courseResponse.isDeleted = true;
        await courseResponse.save();

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: courseResponse
        })

    }catch(err){
        res.status(400).send({
            success: false,
            message: err.message
        })
    }
}

module.exports={approveCourseController,TeacherRoleApproveController , getAllTeacherController , getAllStudentController , BannedUserController , approveCoursesController , removeApproveCoursesController}