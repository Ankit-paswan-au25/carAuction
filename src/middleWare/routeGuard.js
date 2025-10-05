const AppError = require('../utils/appError');

module.exports = (req, res, next) => {

    if (req.user.roleId == 3) {
        return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
}