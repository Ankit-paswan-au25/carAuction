const express = require('express')
const router = express.Router()
const carsController = require('../controllers/cars/index')


router.route('/')
    .get(carsController.getAllCars)
    .post(carsController.createCars)

router.route('/:id')
    .get(carsController.getSingleCars)
    .put(carsController.updateCars)
    .delete(carsController.deleteCars)


module.exports = router