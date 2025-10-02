const mongoose = require('mongoose');
const validator = require('validator');



const auctionSchema = mongoose.Schema(
    {
        carsInAuction: {
            type: Array,
            required: [true, "more than one car is required"]
        },
        dealerId: {
            type: String,
            required: [true, 'Auction creator is important'],
        },
        numberOfParticipants: {
            type: String,
            required: [false, 'Auction creator is important'],
        },
        totalBids: {
            type: String,
            required: [false, 'Auction creator is important'],
        },
        closureBid: {
            type: String,
            required: [false, 'Auction creator is important'],
        },
        auctionDate: {
            type: String,
            required: [true, 'Auction creator is important'],
        },
        autionTime: {
            type: String,
            required: [true, 'Auction creator is important'],
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