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


// Redis
const redis = require('redis');
const redisClient = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    database: config.redis.db,
    retry_strategy: function (options) {
        return Math.min(options.attempt * 100, 3000);
    }
});

// Monitor Redis connection events
redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.on('connect', () => console.log('Connected to Redis'));
// redisClient.on('ready', () => console.log('Redis is ready'));
redisClient.on('end', () => console.log('Redis connection closed'));

module.exports = { connectDB, redisClient };


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
