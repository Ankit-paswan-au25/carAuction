const mongoose = require('mongoose');
const validator = require('validator');



const carsSchema = mongoose.Schema(
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
        auctionId: {
            type: String,
            required: [false, 'Please Provide password'],
            minlength: 8,
            select: false
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

const cars = mongoose.model("cars", carsSchema);
module.exports = cars;