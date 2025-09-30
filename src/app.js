//package dependencies
const express = require('express');
const app = express();



//app dependencies
const globalErrorCatcher = require('./utils/errorController')
const authRoute = require('./routes/authRoutes')



//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//unAuthenticated Routes
app.use('/api/v1/auth', authRoute)



//middleware

//authenticated Routes


//routes which not exist on this server


//error catcher
app.use(globalErrorCatcher)
module.exports = app