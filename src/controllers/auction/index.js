const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const Auction = require('../../models/auctionsModel')



//create Auction
const createAuctions = asyncErrHandler(async (req, res, next) => {
    const { auctionDescription, auctionTitle, carsInAuction, numberOfParticipants, auctionDate, autionTime } = req.body
    //check user is not a normalUser
    if (req.user.roleId === 3) {
        return next(new AppError('You are not authorized to create auction', 403))
    }


    //checking mandatory fields
    if (!carsInAuction || !auctionDate || !autionTime || !auctionTitle || !auctionDescription) {
        return next(new AppError('Please fill Mandatory field', 400))
    }
    //creating new auction object
    const newAuction = {
        auctionTitle: auctionTitle,
        auctionDescription: auctionDescription,
        carsInAuction: carsInAuction,
        dealerId: req.user.dealerId,
        numberOfParticipants: numberOfParticipants ? numberOfParticipants : "",
        auctionDate: auctionDate,
        autionTime: autionTime
    }

    //saving new auction to db
    const createNew = await Auction.create(newAuction)

    res.status(200).json({
        status: "success",
        data: createNew
    })
})


//get All Auctions
const getAllAuctions = asyncErrHandler(async (req, res, next) => {

    const admin = req.query.admin
    let allAuction
    if (admin) {
        //admin can see all auction
        allAuction = await Auction.find({ dealerId: admin })
    } else {
        //every user can see all auction
        allAuction = await Auction.find()
    }

    //if no auction found
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
    //finding auction exists or not
    let auction = await Auction.findById(auctionId)
    if (!auction) {
        return next(new AppError('No Auction found', 404));
    }
    //checking user is not a normalUser
    if (req.user.roleId === 3) {
        return next(new AppError('You are not authorized to update auction', 403))
    }
    //checking user is auction creator or not
    if (req.user.dealerId !== auction.dealerId.toString() && req.user.roleId !== 1) {
        return next(new AppError('You are not authorized to update other dealer auction', 403))
    }
    //updating auction
    const { carsInAuction, auctionDate, autionTime } = req.body

    if (!carsInAuction || !auctionDate || !autionTime) {
        return next(new AppError('Nothing to update', 400))
    }

    //finding if auction exists or not
    const existingAuction = await Auction.findById(auctionId)
    if (!existingAuction) {
        return next(new AppError('No Auction found', 404));
    }

    // Get existing car IDs
    const existingCars = existingAuction.carsInAuction.map(id => id.toString());

    // Filter out cars that already exist
    const carsToAdd = carsInAuction.filter(
        id => !existingCars.includes(id.toString())
    );

    //checking if there are new cars exists or not
    if (carsToAdd.length === 0 && !auctionDate && !autionTime) {
        return next(new AppError('No new cars to add', 400));
    }



    let updateAuction = {}

    if (carsInAuction) {

        updateAuction.carsInAuction = [...existingCars, ...carsToAdd]
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
    //finding auction exists or not
    let auction = await Auction.findById(auctionId)
    if (!auction) {
        return next(new AppError('No Auction found', 404));
    }
    //checking user is not a normalUser
    if (req.user.roleId === 3) {
        return next(new AppError('You are not authorized to delete auction', 403))
    }
    //checking user is auction creator or not
    if (req.user.dealerId !== auction.dealerId.toString() && req.user.roleId !== 1) {
        return next(new AppError('You are not authorized to delete other dealer auction', 403))
    }

    //deleting auction
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