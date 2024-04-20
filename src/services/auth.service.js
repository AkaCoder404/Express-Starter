// const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../configs/');
const { demoHelper } = require('../utils/helper');

// Models
const User = require('../models/users.model');


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
    const results = await User.find({ username: user.username });

    // If user exists, check password
    if (results.length > 0) {
        const equalPass = await verifyPassword(user.password, results[0].password);
        if (equalPass === true) {
            // Create a token
            const token = createToken(user);
            return token;
        } else {
            throw new Error('Invalid password');
        }
    } else {
        return 'User not found';
    }
}

const register = async (user) => {
    demoHelper('register');

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    const newUser = new User(user);
    const results = await newUser.save();

    if (results) {
        const token = createToken(user);
        return token;
    }
    return 'Registration failed';
}

module.exports = {
    login,
    register,
}
