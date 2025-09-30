const mongoose = require('mongoose');
const validator = require('validator');



const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required: [true, 'Please Provide email'],
            unique: true,
            lowerCase: true,
            validate: [validator.isEmail, 'Please provide valid email']
        },
        password: {
            type: String,
            required: [true, 'Please Provide password'],
            minlength: 8,
            select: false
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetTokeExpiresIn: Date,
        roleId: {
            type: Number, //where 1 == superAdmin, 2==Admin ,3 == normalUser 
            default: 3
        },

        isDeleted: {
            type: Boolean,
            dafault: false
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;