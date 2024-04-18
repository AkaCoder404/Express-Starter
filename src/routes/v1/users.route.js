/**
 * @fileoverview This file contains the routes for the users API
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of your book
 *         email:
 *           type: string
 *           description: The email of user
 *       example:
 *         id: 1
 *         username: John Doe
 *         email: john.doe@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user API
 * /users/get_user:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: The user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

const express = require('express');
const { createUser, getUser, getAllUsers, updateUser, deleteUser } = require('../../controllers/users.controller');

const router = express.Router();

router.get('/get_user', getUser);
router.get('/get_all_users', getAllUsers);
router.post('/create_user', createUser);
router.put('/update_user', updateUser);
router.delete('/delete_user', deleteUser);

router.get('/undefined', async (req, res, next) => {
    const err = new Error('Feature not implemented yet');
    next(err);
});

module.exports = router;