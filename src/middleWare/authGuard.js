const AppError = require('../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel')



const authGuard = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]


    if (!token) {

        return next(new AppError('Please  login again', 403))
    }


    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    let authUser = await User.findById(decodedToken.user).lean();

    if (!authUser) {
        return next(new AppError('Please  login again', 403))
    }

    if (authUser) {
        authUser._id = authUser._id.toString();
    }

    req.user = authUser
    next()
}

module.exports = authGuard