const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const dealers = require('../../models/dealersModel')
const User = require('../../models/usersModel')

//create dealer
const createDealers = asyncErrHandler(async (req, res, next) => {
    const { storeName, storeAddress, storeAddPincode } = req.body
    if (!storeName || !storeAddress || !storeAddPincode) {
        return next(new AppError("Please enter all the fields", 400))
    }
    const newDealer = {
        storeName: storeName,
        storeAddress: storeAddress,
        storeAddPincode: storeAddPincode,
        userId: req.user._id
    }

    const createDealers = await dealers.create(newDealer)

    //updating user role to dealer
    await User.findByIdAndUpdate(req.user._id, { roleId: 2, dealerId: createDealers._id }, { new: true })

    res.status(201).json({
        success: true,
        message: "Dealer created successfully",
        createDealers
    })

})

//get all dealers
const getAllDealers = asyncErrHandler(async (req, res, next) => {
    if (req.user.roleId === 3 || req.user.roleId === 2) {
        return next(new AppError("You are not authorized to get all dealers", 403))
    }
    const allDealers = await dealers.find()
    if (!allDealers) {
        return next(new AppError("No Dealers found", 404))
    }
    res.status(200).json({
        success: true,
        allDealers
    })
})


//get single dealer
const getSingleDealers = asyncErrHandler(async (req, res, next) => {
    const dealerId = req.params.id
    const singleDealer = await dealers.findById(dealerId)
    if (!singleDealer) {
        return next(new AppError("No Dealer found", 404))
    }
    res.status(200).json({
        success: true,
        singleDealer
    })
})

//update dealer
const updateDealers = asyncErrHandler(async (req, res, next) => {
    const dealerId = req.params.id
    console.log()
    //checking user is not a normalUser
    if (req.user.roleId === 3) {
        return next(new AppError('You are not authorized to update dealer', 403))
    }

    //checking user is dealer or not
    if (req.user.roleId === 2 && req.user.dealerId !== dealerId) {
        return next(new AppError('You are not authorized to update other dealer', 403))
    }

    const { storeName, storeAddress, storeAddPincode } = req.body

    if (!storeName && !storeAddress && !storeAddPincode) {
        return next(new AppError("Nothing to update", 400))
    }
    let updatestore = {}

    if (storeName) {
        updatestore.storeName = storeName
    }
    if (storeAddress) {
        updatestore.storeAddress = storeAddress
    }
    if (storeAddPincode) {
        updatestore.storeAddPincode = storeAddPincode
    }
    const updatedDealer = await dealers.findByIdAndUpdate(dealerId, updatestore, { new: true })
    if (!updatedDealer) {
        return next(new AppError("No Dealer found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Dealer updated successfully",
        updatedDealer
    })


})

//delete dealer
const deleteDealers = asyncErrHandler(async (req, res, next) => {
    const dealerId = req.params.id
    //checking user is not a normalUser
    if (req.user.roleId === 3) {
        return next(new AppError('You are not authorized to delete dealer', 403))
    }

    //checking user is dealer or not
    if (req.user.roleId === 2 && req.user.dealerId !== dealerId) {
        return next(new AppError('You are not authorized to delete other dealer', 403))
    }

    const deletedDealer = await dealers.findByIdAndDelete(dealerId)
    if (!deletedDealer) {
        return next(new AppError("No Dealer found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Dealer deleted successfully",
    })
})

module.exports = {
    createDealers,
    getAllDealers,
    getSingleDealers,
    updateDealers,
    deleteDealers
}