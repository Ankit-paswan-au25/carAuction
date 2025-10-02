const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealers')

router.route('/')
    .get(dealerController.getAllDealers)
    .post(dealerController.createDealers)
router.route('/:id')
    .get(dealerController.getSingleDealers)
    .put(dealerController.updateDealers)
    .delete(dealerController.deleteDealers)

module.exports = router