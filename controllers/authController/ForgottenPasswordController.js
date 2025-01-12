const nodemailer = require("nodemailer");
const {authModel} = require('../../models/authModel/authModel');
const bcrypt = require("bcrypt")


// Forgotten password controller
const forgottenPasswordController = async (req, res) => {
  try {
      const { email } = req.body;
      console.log(req.body);
      

      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);      
      
      const user = await authModel.findOne({ email });
      // console.log(user);

      if(!user){
        res.status(404).send({
          success:false,
          message:"Please Give Registered Email"
        })
      }
      
      user.otp = otp;

      await user.save();

      const mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
              user: process.env.EMAIL_FROM,
              pass: process.env.EMAIL_PASSWORD,
          },
      });

      const details = {
          from: "bookcovertest@gmail.com",
          to: email,
          subject: "Password Reset",
          text: `Your OTP for password reset is: ${otp}`,
      };

      // Use async/await to handle asynchronous operation
      await mailTransporter.sendMail(details);

      console.log("Email sent successfully");
      res.status(200).send({
          success:true,
          message: "Email sent successfully",
      });


  } catch (error) {
      console.error('Error sending Email:', error);
      res.status(500).send({
          message: "Cannot send mail",
      });
  }
};


const VerifyOtpController = async (req, res) => {
        const { email, otp } = req.body;
        console.log(email, otp);
      
        try {
          // Find the user in the database by email
          const user = await authModel.findOne({ email });
          console.log(user);
      
          if (user && user.otp == otp) {

            console.log('OTP verified');

            res.status(200).send({
                success:true,
                message:"OTP Verified Successfully.",
                user
            })
      
          } else {

        res.status(200).send({
                success:false,
                message:"Invalid OTP.",                
            })
          }

        } catch (error) {
        res.status(400).send({
                success:false,
                message:"Server Error occured in OTP verification",
                error
            })
        }
      };


const ResetPasswordController = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Find the user by email
          const user = await authModel.findOne({ email });
      
          if (user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
      
            // Update the user's password
            user.password = hashedPassword;
            await user.save();
      
            res.status(200).send({
              success: true,
              message: "Password changed successfully",
              user: { email: user.email, username: user.username },
            });
          } else {
            res.status(200).send({
              success: false,
              message: "User not found",
            });
          }
        } catch (error) {
          console.error("Error in ResetPasswordController:", error);
          res.status(500).send({
            success: false,
            message: "An error occurred while resetting the password.",
            error: error.message,
          });
        }
      };
      

      
module.exports = {forgottenPasswordController,VerifyOtpController,ResetPasswordController};