const mongoose = require('mongoose');
const validator = require('validator');



const bidSchema = mongoose.Schema(
    {
        auctionId: {
            type: Array,
            required: [true, "more than one car is required"]
        },
        carId: {
            type: String,
            required: [true, 'Auction creator is important'],
        },
        bidAmount: {
            type: String,
            required: [true, 'Auction creator is important'],
        },
        finalBid: {
            type: String,
            required: [false, 'Auction creator is important'],
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

const bid = mongoose.model("bid", bidSchema);
module.exports = bid;