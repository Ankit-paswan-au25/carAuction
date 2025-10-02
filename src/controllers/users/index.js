const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')

const createUsers = asyncErrHandler((req, res, next) => {
    console.log("createUsers")
})
const getAllUsers = asyncErrHandler((req, res, next) => {
    console.log("getAllUsers")
})
const getSingleUsers = asyncErrHandler((req, res, next) => {
    console.log("getSingleUsers")
})
const updateUsers = asyncErrHandler((req, res, next) => {
    console.log("updateUsers")
})
const deleteUsers = asyncErrHandler((req, res, next) => {
    console.log("deleteUsers")
})

module.exports = {
    createUsers,
    getAllUsers,
    getSingleUsers,
    updateUsers,
    deleteUsers
}