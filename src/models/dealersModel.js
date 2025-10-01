const mongoose = require('mongoose');
const validator = require('validator');



const dealerSchema = mongoose.Schema(
    {
        storeName: {
            type: String,
            required: [true, "Please enter your name"]
        },
        storeAddress: {
            type: String,
            required: [true, "Please enter your name"]
        },
        storeAddPincode: {
            type: String,
            required: [true, "Please enter your name"]
        },
        totalAuction: {
            type: Array,
            required: false
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

const Dealer = mongoose.model("Dealer", dealerSchema);
module.exports = Dealer;