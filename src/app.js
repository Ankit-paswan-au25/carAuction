//package dependencies
const express = require('express');
const app = express();



//app dependencies middleWare
const globalErrorCatcher = require('./utils/errorController');
const authGuard = require('./middleWare/authGuard');

//app  Routes
const authRoute = require('./routes/authRoutes');
const carRoute = require('./routes/carRoute');
const auctionRoute = require('./routes/auction');
const dealerRoute = require('./routes/dealerRoute')
const bidRoute = require('./routes/bidRoute')





//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//unAuthenticated Routes
app.use('/api/v1/auth', authRoute)



//middleware

//checking Authentication
app.use(authGuard)

//authenticated Routes

app.use('/api/v1/cars', carRoute)

app.use('/api/v1/auctions', auctionRoute)

app.use('/api/v1/dealers', dealerRoute)

app.use('/api/v1/bids', bidRoute)


//routes which not exist on this server


//error catcher
app.use(globalErrorCatcher)
module.exports = app