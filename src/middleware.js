/**
 * @fileoverview This file contains custom middleware functions.
 * 
 */

// Order of Middleware:
// 1. accessLog
// 2. helmet
// 3. cors
// 4. bodyParser
// 5. csrf
// 6. jwt
// 7. rateLimiter
// 8. errorLog

const jwt = require('jsonwebtoken');
const config = require('./configs');

// Loggers
function accessLog(req, res, next) {
    const { hostname, method, path, ip, protocol } = req;
    if (process.env.NODE_ENV !== 'test') {
        console.log(`ACCESS: ${method} ${protocol}://${hostname}${path} - ${ip}`);
    }
    next();
}

function errorLog(err, req, res, next) {
    const { hostname, method, path, protocol } = req;
    if (process.env.NODE_ENV !== 'test') {
        console.log(`ERROR: ${method} ${protocol}://${hostname}${path} - ${err}`);
    }
    res.status(500).send({ status: "server-error", message: err.message });
}

function authenticateUser(req, res, next) {
    // Exclude base routes from authentication
    exclude_paths = ['/', '/api', '/docs/', '/api/v1', '/api/v1/auth/login', '/api/v1/auth/register'];
    if (exclude_paths.includes(req.path)) {
        return next();
    }

    // Exclude paths that have /docs/ in them
    doc_paths = ['/docs/'];
    if (doc_paths.some(path => req.path.includes(path))) {
        return next();
    }

    // Get the token from the request
    const token = req.cookies.authToken;
    if (!token) {
        console.log('No token found');
        return res.status(401).send({ status: "unauthorized", message: "Unauthorized access" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded; // Optionally attach user info to the request
        next(); // Token is valid, proceed to the next middleware or route handler
    } catch (error) {
        // Token verification failed
        return res.status(403).send({ status: "forbidden", message: "Invalid token" });
    }
}


// CORS Middleware
function cors(req, res, next) {
    // TODO Implement CORS Middleware
    next();
}

// CSRF Middleware
function csrf(req, res, next) {
    // TODO Implement CSRF Middleware
    next();
}

// Helmet Middleware
function helmet(req, res, next) {
    // TODO Implement Helmet Middleware
    next();
}

// Rate Limiter Middleware
function rateLimiter(req, res, next) {
    // TODO Implement Rate Limiter Middleware
    next();
}

// JWT Middleware (Authentication)
// function jwt(req, res, next) {
//     // TODO Implement JWT Middleware
//     next();
// }

// Body Parser Middleware
function bodyParser(req, res, next) {
    // TODO Implement Body Parser Middleware
    next();
}


module.exports = {
    accessLog,
    errorLog,
    authenticateUser
    // cors,
    // csrf,
    // helmet,
    // rateLimiter,
    // jwt,
    // bodyParser
};