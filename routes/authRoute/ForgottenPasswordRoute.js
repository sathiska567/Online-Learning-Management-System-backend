const express = require('express');
const { forgottenPasswordController, VerifyOtpController,ResetPasswordController } = require('../../controllers/authController/ForgottenPasswordController');
const router = express.Router();


// FORGOTTEN PASSWORD ROUTE || POST
router.post('/forgot-password',forgottenPasswordController)

// VERIFY OTP ROUTE || POST
router.post('/verify-otp',VerifyOtpController)

// VERIFY OTP ROUTE || POST
router.post('/reset-password',ResetPasswordController)



module.exports = router;