const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')

const createUsers = asyncErrHandler((req, res, next) => { })
const getAllUsers = asyncErrHandler((req, res, next) => { })
const getSingleUsers = asyncErrHandler((req, res, next) => { })
const updateUsers = asyncErrHandler((req, res, next) => { })
const deleteUsers = asyncErrHandler((req, res, next) => { })

module.exports = {
    createUsers,
    getAllUsers,
    getSingleUsers,
    updateUsers,
    deleteUsers
}