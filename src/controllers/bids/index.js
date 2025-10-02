const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const Bids = require('../../models/bidModel')


//creating Bid
const createBids = asyncErrHandler(async (req, res, next) => {
    const { auctionId, carId, bidAmount } = req.body
    if (!auctionId, !carId, !bidAmount) {
        return next(new AppError('Please bid amount', 400))
    }
    const newBid = {
        auctionId: auctionId, carId: carId, bidAmount: bidAmount
    }
    const createBid = await Bids.create(newBid)

    res.status(200).json({
        status: "success",
        data: createBid
    })
})

//finding All bid
const getAllBids = asyncErrHandler(async (req, res, next) => {
    const allBids = await Bids.find()
    if (!allBids) {
        return next(new AppError("no bids found", 404))
    }

    res.status(200).json({
        status: "success",
        data: allBids
    })
})


//getting single bid
const getSingleBids = asyncErrHandler(async (req, res, next) => {
    const bidId = req.params.id
    const bid = await Bids.findById(bidId)
    if (!bid) {
        return next(new AppError("no bid found"))
    }

    res.status(200).json({
        status: "success",
        data: bid
    })
})



//updating bid
const updateBids = asyncErrHandler((req, res, next) => {
    const bidId = req.params.id
    const { auctionId, carId, bidAmount } = req.body
    if (!auctionId, !carId, !bidAmount) {
        return next(new AppError('nothing to update', 400))
    }
    let updateBid = {}
    if (auctionId) {
        updateBid.auctionId = auctionId
    }
    if (carId) {
        updateBid.carId = carId
    }
    if (carId) {
        updateBid.bidAmount = bidAmount
    }

    const updateBiddetails = Bids.findByIdAndUpdate(bidId, updateBid)

    res.status(200).json({
        status: "success",
        data: updateBiddetails
    })
})


//deleteing bids
const deleteBids = asyncErrHandler(async (req, res, next) => {
    const bidId = req.params.id
    await Bids.findByIdAndDelete(bidId)
    res.status(200).json({
        status: "success",
        data: "Bid Deleted successfully"
    })
})

module.exports = {
    createBids,
    getAllBids,
    getSingleBids,
    updateBids,
    deleteBids
}