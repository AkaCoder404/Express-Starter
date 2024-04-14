const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../configs/');
const { demoHelper } = require('../utils/helper');

const createToken = (user) => {
    return jwt.sign({ username: user.username }, config.jwt.secret, { expiresIn: '1h' });
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

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
        const equalPass = await verifyPassword(user.password, results[0].password);
        if (equalPass === true) {
            // Create a token
            const token = createToken(user);
            return token;
        } else {
            return 'Incorrect password';
        }
    } else {
        return 'User not found';
    }
}

const register = async (user) => {
    demoHelper('register');

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    // Without ORM
    const results = await db.query('INSERT INTO users SET ?', user)
        .then(([rows, fields]) => {
            return rows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

    // If register is successful, return the user
    if (results.affectedRows > 0) {
        const token = createToken(user);
        return token;
    } else {
        return 'Registration failed';
    }
}

module.exports = {
    login,
    register,
}
