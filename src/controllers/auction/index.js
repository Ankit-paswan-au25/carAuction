const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')

const createAuctions = asyncErrHandler((req, res, next) => { })
const getAllAuctions = asyncErrHandler((req, res, next) => { })
const getSingleAuctions = asyncErrHandler((req, res, next) => { })
const updateAuctions = asyncErrHandler((req, res, next) => { })
const deleteAuctions = asyncErrHandler((req, res, next) => { })

module.exports = {
    createAuctions,
    getAllAuctions,
    getSingleAuctions,
    updateAuctions,
    deleteAuctions
}