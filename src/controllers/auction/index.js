const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const Auction = require('../../models/auctionsModel')



//create Auction
const createAuctions = asyncErrHandler(async (req, res, next) => {

    const { carsInAuction, numberOfParticipants, auctionDate, autionTime } = req.body
    if (!carsInAuction || !auctionDate || !autionTime) {
        return next(new AppError('car,auctiondate auctiontime  are mandatory field', 400))
    }
    const newAuction = {
        carsInAuction: carsInAuction,
        dealerId: req.user._id,
        numberOfParticipants: numberOfParticipants ? numberOfParticipants : "",
        auctionDate: auctionDate,
        autionTime: autionTime
    }

    const createNew = await Auction.create(newAuction)

    res.status(200).json({
        status: "success",
        data: createNew
    })
})


//get All Auctions
const getAllAuctions = asyncErrHandler(async (req, res, next) => {
    const allAuction = await Auction.find()
    if (!allAuction) {
        return next(new AppError("no auction found", 404))
    }
    res.status(200).send({
        status: "success",
        length: allAuction.length,
        data: allAuction
    })
})


//get Single Auction
const getSingleAuctions = asyncErrHandler(async (req, res, next) => {
    const acutionId = req.params.id

    const userAuction = await Auction.findById(acutionId)

    if (!userAuction) {
        return next(new AppError('No Auction found', 404));
    }

    res.status(200).json({
        status: "success",
        data: userAuction
    })
})



//update Auction
const updateAuctions = asyncErrHandler(async (req, res, next) => {
    const auctionId = req.params.id
    const { carsInAuction, auctionDate, autionTime } = req.body

    if (!carsInAuction || !auctionDate || !autionTime) {
        return next(new AppError('Nothing to update', 400))
    }

    let updateAuction = {}

    if (carsInAuction) {
        updateAuction.carsInAuction = carsInAuction
    }
    if (auctionDate) {
        updateAuction.auctionDate = auctionDate
    }
    if (autionTime) {
        updateAuction.autionTime = autionTime
    }


    const updateAuctionDetails = await Auction.findByIdAndUpdate(auctionId, updateAuction)

    res.status(200).json({
        status: "success",
        data: updateAuctionDetails
    })
})


//delete Auction
const deleteAuctions = asyncErrHandler(async (req, res, next) => {
    const auctionId = req.params.id

    await Auction.findByIdAndDelete(auctionId)
    res.status(200).json({
        status: "success",
        data: "Auction deleted"
    })
})


module.exports = {
    createAuctions,
    getAllAuctions,
    getSingleAuctions,
    updateAuctions,
    deleteAuctions
}