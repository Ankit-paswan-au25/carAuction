const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const Cars = require('../../models/carsModel')
const helper = require('./helpers')

const createCars = asyncErrHandler(async (req, res, next) => {
    const { carName, Brand, makeYear, carType, carFeature, regYear,
        fuel, kmDriven, transmission, engineCapicity, auctionId } = req.body
    if (!carName && !Brand && !makeYear && !carType && !carFeature && !regYear && !fuel && !kmDriven && !transmission && !engineCapicity) {
        return next(new AppError('Please check mandatory fields are empty', 400))
    }

    const newCar = {
        carName: carName,
        Brand: Brand,
        makeYear: makeYear,
        carType: carType,
        carFeature: carFeature,
        regYear: regYear,
        fuel: fuel,
        kmDriven: kmDriven,
        transmission: transmission,
        engineCapicity: engineCapicity,
        auctionId: auctionId,
        creatorId: req.user._id
    }
    let user = req.user


    const createCar = await Cars.create(newCar)
    res.status(200).json({
        status: "success",
        newCar: createCar
    })


})
const getAllCars = asyncErrHandler(async (req, res, next) => {
    const AllCar = await Cars.find()
    res.status(200).json({
        status: "success",
        length: AllCar.length,
        data: AllCar
    })
})
const getSingleCars = asyncErrHandler(async (req, res, next) => {
    const carId = req.params.id
    const car = await Cars.findById(carId)
    if (!car) {
        return next(new AppError('no car found ', 404))
    }
    res.status(200).json({
        status: "success",
        car: car
    })
})
const updateCars = asyncErrHandler(async (req, res, next) => {
    const carId = req.params.id

    const carToUpdate = helper.createCarObjecttoUpdate(req)
    if (carToUpdate.isInvalid) {
        return next(new AppError('Nothing to update'))
    }

    const updateCar = await Cars.findByIdAndUpdate(carId, carToUpdate)

    res.status(200).json({
        status: "success",
        updateCar
    })

})
const deleteCars = asyncErrHandler(async (req, res, next) => {
    const carId = req.params.id
    await Cars.findByIdAndDelete(carId)
    res.status(200).json({
        status: "success",
        msg: "car deleted successfully"
    })
})




module.exports = {
    createCars,
    getAllCars,
    getSingleCars,
    updateCars,
    deleteCars
}