/**
 * @fileoverview This file contains the routes for the auth API
 * 
 */


const auth = require('../services/auth.service');

const login = async (req, res, next) => {
    try {
        const token = await auth.login(req.body);
        res.cookie('authToken', token, {
            httpOnly: true, // The cookie is not accessible via JavaScript
            // secure: process.env.NODE_ENV !== 'development', // In production, set secure to true to send over HTTPS
            secure: false,  // In production, set secure to true to send over HTTPS
            sameSite: 'Strict', // Strictly limit to same site requests
            expires: new Date(Date.now() + 3600000) // 1 hour cookie expiration
        });

        res.status(200).send({ "message": "Successfully logged in" });
    } catch (err) {
        console.error('Error while logging in', err.message);
        next(err);
    }
}

const register = async (req, res, next) => {
    try {
        // const results = await users.register(req.body);
        res.send('register');
    } catch (err) {
        console.error('Error while registering', err.message);
        next(err);
    }
}

module.exports = {
    login,
    register
}