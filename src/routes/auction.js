const express = require('express')
const auctionController = require('../controllers/auction/index')

const router = express.Router()

router.route('/')
    .get(auctionController.getAllAuctions)
    .post(auctionController.createAuctions)

router.route('/:id')
    .get(auctionController.getSingleAuctions)
    .put(auctionController.updateAuctions)
    .delete(auctionController.deleteAuctions)

module.exports = router

