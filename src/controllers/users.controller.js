/**
 * @fileoverview This file contains the functions for the user controller.
 */

const users = require('../services/users.service');


const getUser = async (req, res, next) => {
    try {
        const results = await users.getUser(req.body);
        res.send(results);
    } catch (err) {
        console.error('Error while getting user', err.message);
        next(err);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const results = await users.getAllUsers(req.body);
        res.send(results);
    } catch (err) {
        console.error('Error while getting all users', err.message);
        next(err);
    }
}

const createUser = async (req, res) => {
    // TODO Implement createUser
    try {
        users.createUser(req.body);
        res.send('createUser');
    } catch (err) {
        console.error('Error while creating user', err.message);
        next(err);
    }
}

const updateUser = async (req, res) => {
    // TODO Implement updateUser
    try {
        users.updateUser(req.body);
        res.send('updateUser');
    } catch (err) {
        console.error('Error while updating user', err.message);
        next(err);
    }
}

const deleteUser = async (req, res) => {
    // TODO Implement deleteUser
    try {
        users.updateUser
        res.send('deleteUser');
    } catch (err) {
        console.error('Error while deleting user', err.message);
        next(err);
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};