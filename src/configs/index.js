/**
 * @fileoverview This file is the main entry point for configuration.
 * 
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        dockerHost: process.env.MYSQL_DOCKER_HOST,
        user: process.env.MYSQL_USER,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    mongo: {
        host: process.env.MONGO_HOST,
        database: process.env.MONGO_DATABASE,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        port: process.env.MONGO_PORT,
    },
};
