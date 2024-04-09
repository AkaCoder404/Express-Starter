/**
 * @fileoverview This file is the main entry point for the application.
 * 
 */

// Importing the express module
const express = require('express');

// Importing third party middleware
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    accessLog,
    errorLog,
    // cors,
    // csrf,
    // helmet,
    // rateLimiter,
    // jwt,
    // bodyParser
} = require('./middleware.js');

const config = require('./configs');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow CORS from frontend running at localhost:3000
app.use(accessLog);
// app.use(jwt);

// Routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Default API GET Route
app.get('/api', (req, res) => {
    res.send('Hello API!');
});

app.use(errorLog);

// Running the express server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
