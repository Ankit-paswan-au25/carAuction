const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')

const createDealers = asyncErrHandler((req, res, next) => { })
const getAllDealers = asyncErrHandler((req, res, next) => { })
const getSingleDealers = asyncErrHandler((req, res, next) => { })
const updateDealers = asyncErrHandler((req, res, next) => { })
const deleteDealers = asyncErrHandler((req, res, next) => { })

module.exports = {
    createDealers,
    getAllDealers,
    getSingleDealers,
    updateDealers,
    deleteDealers
}