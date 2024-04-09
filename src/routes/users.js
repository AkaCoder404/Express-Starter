/**
 * @fileoverview This file contains the routes for the user API.
 * 
 */

const express = require('express');
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/users.controller');

const router = express.Router();

router.get('/get_user', getUser);
router.post('/create_user', createUser);
router.put('/update_user', updateUser);
router.delete('/delete_user', deleteUser);

module.exports = router;