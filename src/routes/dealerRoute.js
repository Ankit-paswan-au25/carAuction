const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealers')
const routeGuard = require('../middleWare/routeGuard')

router.route('/')
    .get(dealerController.getAllDealers)
    .post(dealerController.createDealers)
router.route('/:id')
    .get(dealerController.getSingleDealers)
    .put(routeGuard, dealerController.updateDealers)
    .delete(routeGuard, dealerController.deleteDealers)

module.exports = router