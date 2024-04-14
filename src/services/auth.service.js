const db = require('../database');
const jwt = require('jsonwebtoken');
const config = require('../configs/');
const { demoHelper } = require('../utils/helper');

const login = async (user) => {
    demoHelper('login');

    // Without ORM
    const results = await db.query('SELECT * FROM users WHERE username = ?', [user.username])
        .then(([rows, fields]) => {
            return rows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

    // If user exists, check password
    if (results.length > 0) {
        if (results[0].password === user.password) {
            // Create a token
            const token = jwt.sign({ username: user.username }, config.jwt.secret, { expiresIn: '1h' });
            return token;
        } else {
            return 'Incorrect password';
        }
    } else {
        return 'User not found';
    }
}

module.exports = {
    login
}
