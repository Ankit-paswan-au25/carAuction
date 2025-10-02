const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const dealers = require('../../models/dealersModel')

const createDealers = asyncErrHandler(async (req, res, next) => {
    const { storeName, storeAddress, storeAddPincode } = req.body
    if (!storeName || !storeAddress || !storeAddPincode) {
        return next(new AppError("Please enter all the fields", 400))
    }
    const newDealer = {
        storeName: storeName,
        storeAddress: storeAddress,
        storeAddPincode: storeAddPincode,
    }

    const createDealers = await dealers.create(newDealer)

    res.status(201).json({
        success: true,
        message: "Dealer created successfully",
        createDealers
    })

})
const getAllDealers = asyncErrHandler(async (req, res, next) => {
    const allDealers = await dealers.find()
    if (!allDealers) {
        return next(new AppError("No Dealers found", 404))
    }
    res.status(200).json({
        success: true,
        allDealers
    })
})
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
const updateDealers = asyncErrHandler(async (req, res, next) => {
    const dealerId = req.params.id

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
const deleteDealers = asyncErrHandler(async (req, res, next) => {
    const dealerId = req.params.id
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