## CarAuction
Virtual car auction platform (Express + Mongoose) with JWT authentication.

## AIRTRIBE
{
   "email": "admin@superadmin.com",
   "password": "admin123"
}

you can login with the above credentials

## Concept
platform for cars platforms like spinny,cars24,trueValue 
put there car in auction  and any user can bid on that.

## roles and resposiblity

## users :
    can register
    can login
    can be view all auction
    can bid on any auction
    can update there self
    can delete there self
    can view all users
## users as dealer:
    any user can register there store
    can create cars 
    can update cars
    can view all cars created by him
    can view single car 
    can delete car
    can create auction
    can update auction
    can view all auction created by him
    can view single auction
    can delete auction
    ## if he bids on any car it will be as user
## superAdmin
    can do everything mentioned above



### Tech Stack
- Node.js, Express (app/server)
- MongoDB, Mongoose (data layer)
- JSON Web Token (auth)
- Jest, Supertest (tests)

### Project Structure
```
carAuction/
  server.js                 # App bootstrap, DB connection + start server
  src/
    app.js                 # Express app, middleware, and route mounting
    config/dbConnection.js # Mongoose connection
    controllers/           # Business logic per domain
      authController/
        index.js
        helpers.js
      auction/
        index.js
        helpers.js
      bids/
        index.js
        helpers.js
      cars/
        index.js
        helpers.js
      dealers/
        index.js
        helpers.js
      users/
        index.js
    middleWare/
      authGuard.js         # Verifies JWT and attaches req.user
      routeGuard.js        # Blocks roleId 3 (normal user) for protected ops
    models/
      auctionsModel.js
      bidModel.js
      carsModel.js
      dealersModel.js
      usersModel.js
    routes/
      authRoutes.js        # /api/v1/auth
      auction.js           # /api/v1/auctions
      bidRoute.js          # /api/v1/bids
      carRoute.js          # /api/v1/cars
      dealerRoute.js       # /api/v1/dealers
      userRoute.js         # (present but empty)
    utils/
      appError.js          # Central AppError class
      asyncErrorhandler.js # Async wrapper to forward errors
      errorController.js   # Global error handler
    test/
      controllerTest/      # Unit tests for controllers
      routeTest/           # Supertest route tests
```

### API Overview
Base URL: `/api/v1`

- Auth (`/auth`)
  - POST `/register` — register user, returns JWT
  - POST `/login` — login user, returns JWT

- Users (`/users`) [requires auth]
  - GET `/` — list users (only super Admin can view)
  - GET `/:id` — get user by id
  - PUT `/:id` — update car (routeGuard)(only user himself and super admin can are authersied)
  - DELETE `/:id` — delete car (routeGuard)

- Cars (`/cars`) [requires auth]
  - GET `/` — list cars (optional `?admin=<dealerId>`)(dealer can view his own created car as well as other car as well)
  - POST `/` — create car (routeGuard)(only dealers can create car)
  - GET `/:id` — get car by id (any one can view any car details)
  - PUT `/:id` — update car (routeGuard)(only super admin and creator of car is allowed)
  - DELETE `/:id` — delete car (routeGuard)(only super admin and creator of car is allowed)

- Auctions (`/auctions`) [requires auth]
  - GET `/` — list auctions (optional `?admin=<dealerId>`)(only super Admin will be able to see all the auctions dealers will be able to see his created cars)
  - POST `/` — create auction
  - GET `/:id` — get auction by id
  - PUT `/:id` — update auction
  - DELETE `/:id` — delete auction

- Dealers (`/dealers`) [requires auth]
  - GET `/` — list dealers
  - POST `/` — create dealer (+promotes user to dealer)
  - GET `/:id` — get dealer by id
  - PUT `/:id` — update dealer (routeGuard)
  - DELETE `/:id` — delete dealer (routeGuard)

- Bids (`/bids`) [requires auth]
  - GET `/` — list bids
  - POST `/` — create bid
  - GET `/:id` — get bid by id
  - PUT `/:id` — update bid
  - DELETE `/:id` — delete bid

Notes:
- `authGuard` is applied globally (after `/auth` routes) in `app.js`; all non-auth routes require a valid `Authorization: Bearer <token>` header.
- `routeGuard` blocks users with `roleId === 3` (normal users) from performing protected actions.

### Environment Variables
Create a `.env` file at the project root with:
```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/carauction
JWT_SECRET=your_jwt_secret_here
NODE_ENV=Development
```

### Install & Run
```
npm install

# Development
npm run dev

# Production
npm run prod
```

### Testing
Tests live under `src/test/` and cover controllers and routes.
```
npm test
```

### Error Handling
- Use `AppError` to throw operational errors with status codes.
- Wrap async controllers with `asyncErrorhandler` to forward rejections to the global error handler (`utils/errorController.js`).

### Authentication
- JWT is generated in `controllers/authController/helpers.js` and validated in `middleWare/authGuard.js`.
- `authGuard` decorates `req.user` when the token is valid. Some actions check roles (e.g., dealers/admins vs normal users).
