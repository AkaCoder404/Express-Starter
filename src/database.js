/**
 * @fileoverview Database configuration
 *
 */

const config = require('./configs');

// MongoDB Database Connection
const mongoose = require('mongoose');
const connectDB = async () => {
    url = "mongodb://" + config.mongo.username + ":" + config.mongo.password + "@";
    url += config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.database;
    url += "?authSource=admin";
    // console.log(url);
    try {
        await mongoose.connect(url, {});
        // console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err.message);
    }
}

// Monitor MongoDB connection events
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to db');
// });

// mongoose.connection.on('error', (err) => {
//     console.log('Mongoose connection error: ' + err);
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//     console.log('Mongoose reconnected');
// });


module.exports = connectDB;


// MySQL Database Connection
// const mysql = require('mysql2/promise');
// const pool = mysql.createPool({
//     host: config.mysql.dockerHost,
//     user: config.mysql.user,
//     port: config.mysql.port,
//     password: config.mysql.password,
//     database: config.mysql.database,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// module.exports = pool;
