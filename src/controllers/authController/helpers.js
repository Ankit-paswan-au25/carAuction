const asyncErrorCatcher = require('../../utils/asyncErrorhandler');
const valid = require('validator');
const jwt = require('jsonwebtoken')
exports.reqValidator = asyncErrorCatcher(async (req) => {
    let routePath = `${req.route.path}`.replace("/", "");
    const { username, password, confirmPassword, email } = req.body

    if (routePath == 'register') {

        //if any field is empty
        if (!username || !password || !confirmPassword || !email) {
            return { msg: 'Please fill all the fields', statusCode: 400, isValid: false }

        }

        //if password and confirPassword is not same
        if (password != confirmPassword || confirmPassword.length < 8) {
            return { msg: 'Password Issue', statusCode: 400, isValid: false }
        }


        //if email is not valid
        if (!valid.isEmail(email)) {

            return { msg: 'Password Issue', statusCode: 400, isValid: false }
        }

        return { msg: 'Success', statusCode: 200, isValid: true }
    }


    if (routePath == 'login') {

        //if not username or Password
        if (!email || !password) {
            return { isValid: false, msg: 'Please enter your email and password', statusCode: 400 }
        }


        const dbUser = await User.findOne({ email: email }).select('+password');

        if (!dbUser) {
            return { isValid: false, msg: 'User not found' }

        }

        const isValidPassword = await bycrpt.compare(password, dbUser.password)

        if (!isValidPassword) {
            return { isValid: false, msg: 'Authentication Failed', statusCode: 401 }
        }

        if (dbUser) {
            dbUser._id = dbUser._id.toString();
        }
        return { data: dbUser, isValid: true, msg: 'success', statusCode: 401 }
    }


});

exports.jwtToken = async (userData) => {
    const token = await jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token
}

