/**
 * @fileoverview This file contains the routes for the auth API
 * 
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: authToken
 *  schemas:
 *      Login:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: The username of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *          example:
 *              username: test
 *              password: password
 * 
 *      Register:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: The username of the user
 *              email:
 *                  type: string
 *                  description: The email of the user            
 *              password:
 *                  type: string
 *                  description: The password of the user
 *          example:
 *              username: test
 *              email: test@gmail.com
 *              password: password
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth API
 * /auth/login:
 *  post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
*                   schema:  
*                       $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Login information
 *          500:
 *              description: Some server error
 * 
 * /auth/register:
 *  post:
 *      summary: Register
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *          responses:
 *              201:
 *                  description: Register information
 *              500:
 *                  description: Some server error
 */

const express = require('express');
const { login, register } = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;