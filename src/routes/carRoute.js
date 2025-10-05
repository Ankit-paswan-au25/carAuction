const express = require('express')
const router = express.Router()
const carsController = require('../controllers/cars/index')
const routeGuard = require('../middleWare/routeGuard')


router.route('/')
    .get(carsController.getAllCars)
    .post(routeGuard, carsController.createCars)

router.route('/:id')
    .get(carsController.getSingleCars)
    .put(routeGuard, carsController.updateCars)
    .delete(routeGuard, carsController.deleteCars)


module.exports = router