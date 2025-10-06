const mongoose = require('mongoose');
const validator = require('validator');



const auctionSchema = mongoose.Schema(
    {
        auctionTitle: {
            type: String,
            required: [true, 'Auction title is important'],
        },
        auctionDescription: {
            type: String,
            required: [true, 'Auction description is important'],
        },
        carsInAuction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cars' }],
        dealerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dealers',
        },
        numberOfParticipants: {
            type: Number,
            required: [false, 'Auction creator is important'],
        },
        totalBids: {
            type: Number,
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