const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    otp:{
       type:String,
       required:false
    },

    jwt:{
      type:String,
      required:false
    },
    
    isStudent:{
        type:Boolean,
        required:true
    },
    isTeacher:{
        type:Boolean,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:false
    },
    isTeacherVerified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const authModel = mongoose.model('authModel', userSchema);

module.exports = { authModel };
