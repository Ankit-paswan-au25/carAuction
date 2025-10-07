const asyncErrHandler = require('../../utils/asyncErrorhandler');
const AppError = require('../../utils/appError')
const User = require('../../models/usersModel')
const bycrpt = require('bcryptjs');


//get all users
const getAllUsers = asyncErrHandler(async (req, res, next) => {

    const allUsers = await User.find().select('-password')
    if (!allUsers) {
        return next(new AppError("No Users found", 404))
    }
    res.status(200).json({
        success: true,
        allUsers
    })
})

//get single user
const getSingleUsers = asyncErrHandler(async (req, res, next) => {

    console.log("dsdsa");
    const userId = req.params.id

    console.log("dsdsa", userId);
    const singleUser = await User.findById({ _id: userId })

    if (!singleUser) {
        return next(new AppError("No User found", 404))
    }
    res.status(200).json({
        success: true,
        singleUser
    })
})

//update user
const updateUsers = asyncErrHandler(async (req, res, next) => {
    const userId = req.params.id

    //only superAdmin and user himself can update user
    if (req.user.roleId !== 1 && req.user._id.toString() !== userId) {
        return next(new AppError("You are not authorized to update user", 403))
    }
    let updateUser = {}
    const { name, email, password } = req.body
    if (name) updateUser.name = name
    if (email) updateUser.email = email
    if (password) {
        //hashing password
        const salt = await bycrpt.genSalt(0, 12)
        const hashedPassword = await bycrpt.hash(password, salt)
        updateUser.password = hashedPassword
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateUser, { new: true })
    if (!updatedUser) {
        return next(new AppError("No User found", 404))
    }
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser
    })
})


//delete user
const deleteUsers = asyncErrHandler(async (req, res, next) => {
    const userId = req.params.id

    //only superAdmin and user himself can update user
    if (req.user.roleId !== 1 && req.user._id.toString() !== userId) {
        return next(new AppError("You are not authorized to update user", 403))
    }

    //
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
        return next(new AppError("No User found", 404))
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})

module.exports = {
    getAllUsers,
    getSingleUsers,
    updateUsers,
    deleteUsers
}