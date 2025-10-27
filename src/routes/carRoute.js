const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars/index');
const routeGuard = require('../middleWare/routeGuard');
const helper = require('../controllers/cars/helpers');

router.route('/')
    .get(carsController.getAllCars)
    .post(routeGuard, carsController.createCars)

router.route('/:id')
    .get(carsController.getSingleCars)
    .put(routeGuard, carsController.updateCars)
    .delete(routeGuard, carsController.deleteCars);
router.post('/bulkUpload/cars', routeGuard, helper.upload.single("carBulk"), carsController.bulkUploadCars)


module.exports = router