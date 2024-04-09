/**
 * @fileoverview This file is the main entry point for middleware.
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


// Loggers
function accessLog(req, res, next) {
    const { hostname, method, path, ip, protocol } = req;
    console.log(`ACCESS: ${method} ${protocol}://${hostname}${path} - ${ip}`);
    next();
}

function errorLog(err, req, res, next) {
    const { hostname, method, path, protocol } = req;
    console.log(`ERROR: ${method} ${protocol}://${hostname}${path} - ${err}`);
    res.status(500).send({ status: "server-error", message: err.message });
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
function jwt(req, res, next) {
    // TODO Implement JWT Middleware
    next();
}

// Body Parser Middleware
function bodyParser(req, res, next) {
    // TODO Implement Body Parser Middleware
    next();
}


module.exports = {
    accessLog,
    errorLog,
    // cors,
    // csrf,
    // helmet,
    // rateLimiter,
    // jwt,
    // bodyParser
};