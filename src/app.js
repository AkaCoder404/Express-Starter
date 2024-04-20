/**
 * @fileoverview This file is the main entry point for the application.
 * 
 */

// Importing the express module
const express = require('express');
const mongoose = require('mongoose');

// Importing the database connection
const connectDB = require('./database.js');
connectDB();

// Importing the swagger module
const swaggerDoc = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./documentation.js');
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Importing third party middleware
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helment = require('helmet');
const rateLimit = require('express-rate-limit');
// const xss = require('xss-clean'); // Not longer maintained
const cors = require('cors');

// Importing custom middleware
const {
    accessLog,
    errorLog,
    authenticateUser
} = require('./middleware.js');

const config = require('./configs');
const app = express();

// Middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).send('Too many requests from this IP, please try again after 15 minutes');
    }
});

const corsOptions = { // Allow requests from the frontend
    origin: 'http://localhost:3000',
    credentials: true,
};

const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
};


app.use(express.json());        // Parse incoming request with JSON payloads
app.use(helment());             // Secure Express apps by setting various HTTP headers
// app.use(xss());                 // Sanitize request data to prevent XSS attacks
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(accessLog);
app.use(authenticateUser);
// Routes
const apiRoutes = require('./routes/v1/index.js');
app.use('/api/v1', apiLimiter, apiRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the app!');
});

// Default V1 Route
app.get('/api/v1', (req, res) => {
    res.send('Welcome to V1 of the API!');
});

// Documentation
app.use("/docs/", swaggerDoc.serve, swaggerDoc.setup(swaggerSpec, { explorer: true }));

// Handle Process Termination
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to app termination');
        process.exit(0);
    });
});

// Running the express server
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

app.use(errorLog);
app.use((_req, _res, next) => next(new Error('Route not found')));
app.use(errorLog);

// TODO Export app for testing?
module.exports = app;
