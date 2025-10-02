const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bids')



router.route('/')
    .get(bidController.getAllBids)
    .post(bidController.createBids)
router.route('/:id')
    .get(bidController.getSingleBids)
    .put(bidController.updateBids)
    .delete(bidController.deleteBids)

module.exports = router