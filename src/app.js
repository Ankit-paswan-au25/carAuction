//package dependencies
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');



//app dependencies middleWare
const globalErrorCatcher = require('./utils/errorController');
const authGuard = require('./middleWare/authGuard');
const AppError = require('./utils/appError');

//app  Routes
const authRoute = require('./routes/authRoutes');
const carRoute = require('./routes/carRoute');
const auctionRoute = require('./routes/auction');
const dealerRoute = require('./routes/dealerRoute');
const bidRoute = require('./routes/bidRoute');
const userRoute = require('./routes/userRoute');




//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//unAuthenticated Routes
app.use('/api/v1/auth', authRoute)



//middleware

//checking Authentication
app.use(authGuard)

//security HTTP headers
app.use(helmet());


//helmet coustmization---------------------------------------------
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "https://trusted.cdn.com"],
//       styleSrc: ["'self'", "'unsafe-inline'"], // avoid unsafe-inline where possible
//       imgSrc: ["'self'", "data:"],
//       connectSrc: ["'self'", "https://api.example.com"],
//     }
//   },
//   hsts: {
//     maxAge: 31536000, // 1 year in seconds
//     includeSubDomains: true,
//     preload: true
//   },
//   referrerPolicy: { policy: "no-referrer-when-downgrade" }
// }));

//hemlet coustmization---------------------------------------------end

//enable cors
app.use(cors());

//cors customization---------------------------------------------
// const allowedOrigins = ['https://example.com', 'https://app.example.com'];

// app.use(cors({
//   origin: function(origin, callback){
//     // Allow non-browser requests with no origin (e.g., curl, mobile)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS not allowed by policy'));
//     }
//   },
//   credentials: true, // allow cookies/credentials
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization']
// }));

//cors customization---------------------------------------------end

//authenticated Routes

app.use('/api/v1/cars', carRoute);

app.use('/api/v1/auctions', auctionRoute);

app.use('/api/v1/dealers', dealerRoute);

app.use('/api/v1/bids', bidRoute);

app.use('/api/v1/users', userRoute);

app.all('/{*splat}', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});



//routes which not exist on this server


//error catcher
app.use(globalErrorCatcher)
module.exports = app