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
            required: [false, 'Auction creator is important'],
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

const auctions = mongoose.model("auctions", auctionSchema);
module.exports = auctions;