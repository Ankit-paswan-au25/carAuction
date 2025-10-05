const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const Cars = require('../../models/carsModel')
const helper = require('./helpers')



//create car
const createCars = asyncErrHandler(async (req, res, next) => {
    const { carName, Brand, makeYear, carType, carFeature, regYear,
        fuel, kmDriven, transmission, engineCapicity, auctionId } = req.body
    //if any  mandatory field is empty
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
        creatorId: req.user.dealerId
    }



    const createCar = await Cars.create(newCar)
    res.status(200).json({
        status: "success",
        newCar: createCar
    })


})

//get all cars
const getAllCars = asyncErrHandler(async (req, res, next) => {

    const { admin, limit, page } = req.query;

    let AllCar
    if (admin) {

        AllCar = await Cars.find({ creatorId: admin })
    }
    else {
        AllCar = await Cars.find()
    }

    res.status(200).json({
        status: "success",
        length: AllCar.length,
        data: AllCar
    })
})

//get single car
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

//update car
const updateCars = asyncErrHandler(async (req, res, next) => {

    const carId = req.params.id

    //finding car exists or not
    let car = await Cars.findById(carId)
    if (!car) {
        return next(new AppError('no car found ', 404))
    }


    // checking car is owned by user or not
    console.log(car.creatorId, req.user.dealerId, req.user.roleId);
    if (car.creatorId.toString() !== req.user.dealerId.toString() && req.user.roleId !== 1) {
        return next(new AppError('You are not authorized to update this car', 403))
    }

    //creating object to update
    const carToUpdate = helper.createCarObjecttoUpdate(req)

    if (carToUpdate.isInvalid) {
        return next(new AppError('Nothing to update'))
    }
    //updating car
    const updateCar = await Cars.findByIdAndUpdate(carId, carToUpdate)

    res.status(200).json({
        status: "success",
        updateCar
    })

})


//delete car
const deleteCars = asyncErrHandler(async (req, res, next) => {
    const carId = req.params.id

    //finding car exists or not
    let car = await Cars.findById(carId)
    if (!car) {
        return next(new AppError('no car found ', 404))
    }
    // checking car is owned by user or not

    if (car.creatorId.toString() !== req.user._id && req.user.roleId !== 1) {
        return next(new AppError('You are not authorized to delete this car', 403))
    }
    //deleting car
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