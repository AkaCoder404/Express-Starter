/**
 * @fileoverview Database configuration
 *
 */

const config = require('./configs');

// MySQL Database Connection
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: config.mysql.dockerHost,
    user: config.mysql.user,
    port: config.mysql.port,
    password: config.mysql.password,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// console.log("Connected to MySQL at " + config.mysql.dockerHost);
// pool.query('SHOW tables').then(([rows, fields]) => {
//     console.log(rows);
// }
// ).catch((err) => {
//     console.error(err);
// }
// );

// // MongoDB Database Connection
// const { MongoClient } = require('mongodb');
// const uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}?retryWrites=true&w=majority`;

// // Create client
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // Connect to MongoDB
// client.connect(err => {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }
//     console.log('Connected to MongoDB');
// });
// // Set database
// const mongoDB = client.db(config.mongodb.database);

// Mongoose ORM for for MongoDB

// module.exports = {
//     pool,
//     // mongoDB
// }


module.exports = pool;