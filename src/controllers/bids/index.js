const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')

const createBids = asyncErrHandler((req, res, next) => { })
const getAllBids = asyncErrHandler((req, res, next) => { })
const getSingleBids = asyncErrHandler((req, res, next) => { })
const updateBids = asyncErrHandler((req, res, next) => { })
const deleteBids = asyncErrHandler((req, res, next) => { })

module.exports = {
    createBids,
    getAllBids,
    getSingleBids,
    updateBids,
    deleteBids
}