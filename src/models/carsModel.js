const mongoose = require('mongoose');
const validator = require('validator');



const carsSchema = mongoose.Schema(
    {
        carName: {
            type: String,
            required: [true, "Please enter your name"]
        },
        Brand: {
            type: String,
            required: [true, "Please enter your name"]
        },
        makeYear: {
            type: String,
            required: [true, "Please enter your name"]
        },
        carType: {
            type: String,
            required: [true, "Please enter your name"]
        },
        carFeature: {
            type: String,
            required: [true, "Please enter your name"]
        },
        regYear: {
            type: String,
            required: [false, "Please enter your name"]
        },
        fuel: {
            type: String,
            required: [true, "Please enter your name"]
        },
        kmDriven: {
            type: String,
            required: [true, "Please enter your name"]
        },
        transmission: {
            type: String,
            required: [true, "Please enter your name"]
        },
        engineCapicity: {
            type: String,
            required: [true, "Please enter your name"]
        },
        auctionId: {
            type: Array,
            required: [false, 'Please Provide password'],
            minlength: 8,
            select: false
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
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