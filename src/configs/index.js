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
    // mongodb: {
    //     host: process.env.MONGODB_HOST,
    //     user: process.env.MONGODB_USER,
    //     password: process.env.MONGODB_PASSWORD,
    //     database: process.env.MONGODB_DATABASE,
    // }
};
