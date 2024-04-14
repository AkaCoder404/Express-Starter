/**
 * @fileoverview This is the entry point for routes.
 * 
 */

const express = require('express');
const router = express.Router();

const userRoutes = require('./users.route');
router.use('/users', userRoutes);

const authRoutes = require('./auth.route');
router.use('/auth', authRoutes);

module.exports = router;