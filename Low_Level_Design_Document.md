# Low-Level Design (LLD) Document - Car Auction Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [API Design](#api-design)
5. [Authentication & Authorization](#authentication--authorization)
6. [Error Handling](#error-handling)
7. [Security Implementation](#security-implementation)
8. [File Structure](#file-structure)
9. [Dependencies & Technologies](#dependencies--technologies)
10. [Testing Strategy](#testing-strategy)
11. [Deployment Considerations](#deployment-considerations)

---

## Project Overview

**Car Auction Platform** is a virtual car auction system built with Node.js, Express, and MongoDB. It enables car dealerships to list vehicles for auction and allows users to bid on them, similar to platforms like Spinny, Cars24, and TrueValue.

### Key Features:
- User registration and authentication
- Role-based access control (Super Admin, Dealer, Regular User)
- Car listing and management
- Auction creation and management
- Bidding system
- Dealer store management

---

## System Architecture

### High-Level Architecture Pattern
The application follows a **Layered Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│                Client Layer              │
│         (Web/Mobile Applications)        │
└─────────────────┬───────────────────────┘
                  │ HTTP/HTTPS
┌─────────────────▼───────────────────────┐
│              Express Server              │
│  ┌─────────────┬─────────────────────────┐│
│  │   Routes    │      Middleware          ││
│  │             │  ┌─────────────────────┐││
│  │             │  │   Auth Guard        │││
│  │             │  │   Route Guard       │││
│  │             │  │   Error Handler     │││
│  │             │  └─────────────────────┘││
│  └─────────────┴─────────────────────────┘│
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Controller Layer              │
│  ┌─────────────┬─────────────────────────┐│
│  │   Auth      │      Business Logic     ││
│  │   Cars      │      Validation         ││
│  │   Auctions  │      Data Processing    ││
│  │   Bids      │                         ││
│  │   Dealers   │                         ││
│  └─────────────┴─────────────────────────┘│
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│              Data Layer                 │
│  ┌─────────────┬─────────────────────────┐│
│  │   Models    │      MongoDB            ││
│  │   Schemas   │      Mongoose ODM       ││
│  │   Relations │                         ││
│  └─────────────┴─────────────────────────┘│
└─────────────────────────────────────────┘
```

### Request Flow
1. **Client Request** → Express Server
2. **Route Matching** → Route Handler
3. **Authentication** → AuthGuard Middleware
4. **Authorization** → RouteGuard Middleware (if needed)
5. **Controller** → Business Logic Processing
6. **Model** → Database Operations
7. **Response** → Client

---

## Database Design

### Entity Relationship Diagram

```
Users (1) ──────── (0..1) Dealers
  │                    │
  │                    │
  │ (1)                │ (1)
  │                    │
  ▼                    ▼
Cars ──────────────── Auctions
  │                    │
  │ (1)                │ (1)
  │                    │
  ▼                    ▼
Bids ──────────────────┘
```

### Database Schemas

#### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, minlength: 8, select: false),
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetTokeExpiresIn: Date,
  dealerId: ObjectId (ref: 'dealers'),
  roleId: Number (default: 3), // 1=SuperAdmin, 2=Dealer, 3=User
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Cars Collection
```javascript
{
  _id: ObjectId,
  carName: String (required),
  Brand: String (required),
  makeYear: String (required),
  carType: String (required),
  carFeature: String (required),
  regYear: String,
  fuel: String (required),
  kmDriven: String (required),
  transmission: String (required),
  engineCapicity: String (required),
  auctionId: Array,
  creatorId: ObjectId (ref: 'User', required),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Auctions Collection
```javascript
{
  _id: ObjectId,
  auctionTitle: String (required),
  auctionDescription: String (required),
  carsInAuction: [ObjectId] (ref: 'cars'),
  dealerId: ObjectId (ref: 'dealers'),
  numberOfParticipants: Number,
  totalBids: Number,
  closureBid: String,
  auctionDate: String (required),
  autionTime: String (required),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. Bids Collection
```javascript
{
  _id: ObjectId,
  auctionId: Array (required),
  carId: String (required),
  bidAmount: String (required),
  userId: ObjectId (ref: 'user', required),
  finalBid: String,
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. Dealers Collection
```javascript
{
  _id: ObjectId,
  storeName: String (required),
  storeAddress: String (required),
  userId: ObjectId (ref: 'User', required),
  storeAddPincode: String (required),
  totalAuction: Array,
  totalSold: Array,
  totalEarning: Number,
  status: String,
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Design

### Base URL Structure
```
/api/v1/{resource}
```

### API Endpoints

#### Authentication Routes (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |

#### User Routes (`/api/v1/users`)
| Method | Endpoint | Description | Auth Required | Authorization |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | List all users | Yes | Super Admin only |
| GET | `/:id` | Get user by ID | Yes | Self or Super Admin |
| PUT | `/:id` | Update user | Yes | Self or Super Admin |
| DELETE | `/:id` | Delete user | Yes | Self or Super Admin |

#### Car Routes (`/api/v1/cars`)
| Method | Endpoint | Description | Auth Required | Authorization |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | List cars | Yes | All authenticated users |
| POST | `/` | Create car | Yes | Dealers only |
| GET | `/:id` | Get car by ID | Yes | All authenticated users |
| PUT | `/:id` | Update car | Yes | Creator or Super Admin |
| DELETE | `/:id` | Delete car | Yes | Creator or Super Admin |
| POST | `/bulkUpload/cars` | Bulk upload cars | Yes | Dealers only |

#### Auction Routes (`/api/v1/auctions`)
| Method | Endpoint | Description | Auth Required | Authorization |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | List auctions | Yes | All authenticated users |
| POST | `/` | Create auction | Yes | Dealers only |
| GET | `/:id` | Get auction by ID | Yes | All authenticated users |
| PUT | `/:id` | Update auction | Yes | Creator or Super Admin |
| DELETE | `/:id` | Delete auction | Yes | Creator or Super Admin |

#### Dealer Routes (`/api/v1/dealers`)
| Method | Endpoint | Description | Auth Required | Authorization |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | List dealers | Yes | All authenticated users |
| POST | `/` | Create dealer | Yes | All authenticated users |
| GET | `/:id` | Get dealer by ID | Yes | All authenticated users |
| PUT | `/:id` | Update dealer | Yes | Self or Super Admin |
| DELETE | `/:id` | Delete dealer | Yes | Self or Super Admin |

#### Bid Routes (`/api/v1/bids`)
| Method | Endpoint | Description | Auth Required | Authorization |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | List bids | Yes | All authenticated users |
| POST | `/` | Create bid | Yes | All authenticated users |
| GET | `/:id` | Get bid by ID | Yes | All authenticated users |
| PUT | `/:id` | Update bid | Yes | Self or Super Admin |
| DELETE | `/:id` | Delete bid | Yes | Self or Super Admin |

---

## Authentication & Authorization

### JWT Implementation
- **Token Generation**: Uses `jsonwebtoken` library
- **Token Expiry**: 1 hour
- **Secret**: Stored in environment variables
- **Payload**: `{ userId, name, email }`

### Authentication Flow
1. User submits credentials
2. Server validates credentials
3. Server generates JWT token
4. Client stores token
5. Client sends token in `Authorization: Bearer <token>` header
6. Server validates token on each request

### Authorization Levels
1. **Super Admin (roleId: 1)**: Full system access
2. **Dealer (roleId: 2)**: Can create/manage cars and auctions
3. **Regular User (roleId: 3)**: Can view and bid on auctions

### Middleware Implementation

#### AuthGuard Middleware
```javascript
// Validates JWT token and attaches user to request
const authGuard = async (req, res, next) => {
    // Extract token from Authorization header
    // Verify JWT token
    // Fetch user from database
    // Attach user to req.user
    // Call next()
}
```

#### RouteGuard Middleware
```javascript
// Prevents regular users from accessing protected routes
const routeGuard = (req, res, next) => {
    if (req.user.roleId === 3) {
        return next(new AppError('Permission denied', 403));
    }
    next();
}
```

---

## Error Handling

### Error Handling Strategy
The application implements a comprehensive error handling system:

#### 1. Custom Error Class
```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}
```

#### 2. Async Error Handler
```javascript
// Wraps async functions to catch errors
const asyncErrorCatcher = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
```

#### 3. Global Error Handler
- **Development Mode**: Returns detailed error information
- **Production Mode**: Returns sanitized error messages
- Handles different error types:
  - Database validation errors
  - JWT errors
  - Duplicate field errors
  - Cast errors

#### 4. Error Types Handled
- **Operational Errors**: User-related errors (400, 401, 403, 404)
- **Programming Errors**: System errors (500)
- **Database Errors**: Validation, cast, duplicate errors
- **Authentication Errors**: JWT expiry, invalid tokens

---

## Security Implementation

### Security Measures
1. **Helmet**: HTTP security headers
2. **CORS**: Cross-origin resource sharing configuration
3. **Password Hashing**: bcryptjs with salt rounds
4. **JWT Security**: Secure token generation and validation
5. **Input Validation**: Validator library for email validation
6. **Environment Variables**: Sensitive data protection

### Security Headers (Helmet)
- Content Security Policy
- HTTP Strict Transport Security
- Referrer Policy
- X-Frame-Options
- X-Content-Type-Options

### Password Security
- Minimum 8 characters
- bcrypt hashing with salt
- Password not returned in API responses

---

## File Structure

```
carAuction/
├── server.js                    # Application entry point
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
├── .env                         # Environment variables
└── src/
    ├── app.js                   # Express app configuration
    ├── config/
    │   └── dbConnection.js      # MongoDB connection
    ├── controllers/             # Business logic
    │   ├── authController/
    │   │   ├── index.js         # Auth endpoints
    │   │   └── helpers.js       # Auth utilities
    │   ├── auction/
    │   │   ├── index.js         # Auction endpoints
    │   │   └── helpers.js       # Auction utilities
    │   ├── bids/
    │   │   ├── index.js         # Bid endpoints
    │   │   └── helpers.js       # Bid utilities
    │   ├── cars/
    │   │   ├── index.js         # Car endpoints
    │   │   └── helpers.js       # Car utilities
    │   ├── dealers/
    │   │   ├── index.js         # Dealer endpoints
    │   │   └── helpers.js       # Dealer utilities
    │   └── users/
    │       ├── index.js         # User endpoints
    │       └── helpers.js       # User utilities
    ├── middleWare/
    │   ├── authGuard.js         # JWT authentication
    │   └── routeGuard.js        # Role-based authorization
    ├── models/                  # Database schemas
    │   ├── auctionsModel.js
    │   ├── bidModel.js
    │   ├── carsModel.js
    │   ├── dealersModel.js
    │   └── usersModel.js
    ├── routes/                  # API route definitions
    │   ├── authRoutes.js
    │   ├── auction.js
    │   ├── bidRoute.js
    │   ├── carRoute.js
    │   ├── dealerRoute.js
    │   └── userRoute.js
    ├── utils/                   # Utility functions
    │   ├── appError.js          # Custom error class
    │   ├── asyncErrorhandler.js # Async error wrapper
    │   └── errorController.js   # Global error handler
    └── test/                    # Test files
        ├── controllerTest/      # Unit tests
        └── routeTest/           # Integration tests
```

---

## Dependencies & Technologies

### Core Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **validator**: Input validation
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **multer**: File upload handling
- **xlsx**: Excel file processing

### Development Dependencies
- **nodemon**: Development server
- **cross-env**: Cross-platform environment variables
- **jest**: Testing framework

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT
- **Testing**: Jest
- **Security**: Helmet, CORS
- **File Processing**: Multer, XLSX

---

## Testing Strategy

### Test Structure
```
src/test/
├── controllerTest/             # Unit tests for controllers
│   ├── controllerAuction.test.js
│   ├── controllerAuth.test.js
│   ├── controllerBids.test.js
│   ├── controllerCars.test.js
│   ├── controllerDealers.test.js
│   └── controllerUsers.test.js
└── routeTest/                  # Integration tests for routes
    ├── routeAuction.test.js
    ├── routeAuth.test.js
    ├── routeBids.test.js
    ├── routeCars.test.js
    └── routeDealers.test.js
```

### Testing Approach
- **Unit Tests**: Test individual controller functions
- **Integration Tests**: Test complete API endpoints
- **Test Framework**: Jest
- **Test Coverage**: Controllers and routes

---

## Deployment Considerations

### Environment Configuration
```bash
# Development
NODE_ENV=Development
PORT=3000
MONGODB_URL=mongodb://localhost:27017/carauction
JWT_SECRET=your_jwt_secret_here

# Production
NODE_ENV=Production
PORT=3000
MONGODB_URL=mongodb://production-url/carauction
JWT_SECRET=production_jwt_secret
```

### Process Management
- **Uncaught Exception Handler**: Graceful shutdown on uncaught exceptions
- **Unhandled Rejection Handler**: Graceful shutdown on unhandled promise rejections
- **Database Connection**: Automatic reconnection handling

### Scripts
```json
{
  "dev": "cross-env process.env.NODE_ENV=Development nodemon server.js",
  "prod": "cross-env process.env.NODE_ENV=Production node server.js",
  "test": "jest"
}
```

### Security Considerations
- Environment variables for sensitive data
- JWT secret rotation
- Database connection security
- Input sanitization
- Rate limiting (recommended for production)
- HTTPS enforcement (recommended for production)

---

## Conclusion

This Car Auction Platform implements a robust, scalable architecture with clear separation of concerns, comprehensive error handling, and security measures. The system supports multiple user roles, provides a complete auction workflow, and includes testing infrastructure for quality assurance.

### Key Strengths:
- Clean layered architecture
- Comprehensive error handling
- Role-based access control
- Security best practices
- Test coverage
- Scalable design patterns

### Areas for Enhancement:
- Add rate limiting
- Implement caching layer
- Add comprehensive logging
- Implement real-time bidding with WebSockets
- Add file upload validation
- Implement data pagination
- Add API documentation with Swagger
