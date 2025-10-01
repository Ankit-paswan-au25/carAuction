const AppError = require('./appError');
//other error

const DbCastErrorHandler = err => {
    const message = `Invalid ${err.path}:${err.value}`
    return new AppError(message, 400)
}

const DbValidationErrorHandler = err => {
    const error = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data${error}`
    return new AppError(message, 400)
}

const DbDuplicateErrorHandler = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    const message = `Duplicate field value ${value}.Please find another value`
    return new AppError(message, 400)
}

const jwtExpiryHandler = () => {

    const message = `Authentication failed,Please login Again`
    return new AppError(message, 401)
}

const jwtTokenErrorHandler = () => {
    const message = `Authentication failed,Please login Again`
    return new AppError(message, 401)
}

//error on dev
const sendDevErr = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });

}


//error on production
const sendProdErr = (err, res) => {
    //operational error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else {
        //programming error
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        });

    }

}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if (process.env.NODE_ENV == 'Development') {
        sendDevErr(err, res)
    }
    else {
        let error = { ...err }
        if (error.name === 'castError') error = DbCastErrorHandler(error)
        if (error.name === 'validationError') error = DbValidationErrorHandler(error)
        if (error.name === 'TokenExpiredError') error = jwtExpiryHandler()
        if (error.name === 'JsonWebTokenError') error = jwtTokenErrorHandler()
        if (error.code === 11000) error = DbDuplicateErrorHandler(error)

        sendProdErr(error, res)

    }
}