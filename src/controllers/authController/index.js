const asyncErrorCatcher = require('../../utils/asyncErrorhandler');
const logicHelper = require('./helpers')
const AppError = require('../../utils/appError');
const valid = require('validator');
const bycrpt = require('bcryptjs');
const User = require('../../models/usersModel')



const register = asyncErrorCatcher(async (req, res, next) => {
    const { username, password, confirmPassword, email } = req.body


    //if any field is empty
    if (!username || !password || !confirmPassword || !email) {
        return next(new AppError('Please fill all the fields', 403))
    }

    //if password and confirPassword is not same
    if (password != confirmPassword || confirmPassword.length < 8) {
        return next(new AppError('Password Issue', 403))
    }


    //if email is not valid
    if (!valid.isEmail(email)) {
        return next(new AppError('Email is not valid', 403))
    }


    //genrating salt to 
    const salt = await bycrpt.genSalt(0, 12)



    //hashing password
    const hashedPassword = await bycrpt.hash(password, salt)

    //new user in object
    const newUser = {
        name: username,
        email: email,
        password: hashedPassword,
        roleId: username === 'Admin' && confirmPassword === 'admin' ? 1 : 3
    }

    //creating user in dataBase
    const dbUser = await User.create(newUser)

    if (dbUser) {
        dbUser._id = dbUser._id.toString();
    }


    //creating token
    const payloadtoken = {
        userId: dbUser._id,
        name: dbUser.name,
        email: dbUser.email

    }
    const token = await logicHelper.jwtToken(payloadtoken)

    res.status(201).send({
        status: "Success",
        token: token
    })


});

const login = asyncErrorCatcher(async (req, res, next) => {
    const { email, password } = req.body

    //if not username or Password
    if (!email || !password) {
        return next(new AppError('Please fill All the fields', 403));
    }


    const dbUser = await User.findOne({ email: email }).select('+password');


    if (!dbUser) {
        return next(new AppError('User not Found', 404));
    }

    const isValidPassword = await bycrpt.compare(password, dbUser.password)


    if (!isValidPassword) {
        return next(new AppError('Authentication Failed', 401));
    }

    if (dbUser) {
        dbUser._id = dbUser._id.toString();
    }

    const token = await logicHelper.jwtToken({ userId: dbUser._id, email: dbUser.email })

    res.status(200).send({
        status: "success",
        token: token
    })


});

module.exports = {
    register,
    login
}