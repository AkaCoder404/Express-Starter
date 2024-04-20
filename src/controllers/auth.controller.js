/**
 * @fileoverview This file contains the routes for the auth API
 * 
 */


const auth = require('../services/auth.service');

const setCookie = (res, token) => {
    res.cookie('authToken', token, {
        httpOnly: true, // The cookie is not accessible via JavaScript
        // secure: process.env.NODE_ENV !== 'development', // In production, set secure to true to send over HTTPS
        secure: false,  // In production, set secure to true to send over HTTPS
        sameSite: 'Strict', // Strictly limit to same site requests
        expires: new Date(Date.now() + 3600000) // 1 hour cookie expiration
    });
}

const login = async (req, res, next) => {
    try {
        const token = await auth.login(req.body);
        setCookie(res, token);
        res.status(200).send({ "message": "Successfully logged in" });
    } catch (err) {
        console.error('Error while logging in', err.message);
        next(err);
    }
}

const register = async (req, res, next) => {
    try {
        const token = await auth.register(req.body);
        setCookie(res, token);
        res.status(201).send({ "message": "Successfully registered" });
    } catch (err) {
        console.error('Error while registering', err.message);
        next(err);
    }
}

const login_cache = async (req, res, next) => {
    try {
        const login_count = await auth.loginCache(req.body);
        res.status(200).send({ "message": "There has been " + login_count + " logins in the last 5 minutes" });
    } catch (err) {
        console.error('Error while logging in', err.message);
        next(err);
    }
}

module.exports = {
    login,
    register,
    login_cache
}