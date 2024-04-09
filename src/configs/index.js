/**
 * @fileoverview This file is the main entry point for configuration.
 * 
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    // mongodb: {
    //     host: process.env.MONGODB_HOST,
    //     user: process.env.MONGODB_USER,
    //     password: process.env.MONGODB_PASSWORD,
    //     database: process.env.MONGODB_DATABASE,
    // }
};
