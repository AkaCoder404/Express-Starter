// const db = require('../database');
const { demoHelper } = require('../utils/helper');

// Models
const User = require('../models/users.model');


const getUser = async (user) => {
    demoHelper('getUser');
    const result = await User.find({ username: user.username });
    if (result.length > 0) {
        return result[0];
    } else {
        return 'User not found';
    }

}

const getAllUsers = async () => {
    demoHelper('getAllUsers');

    const result = await User.find();
    if (result.length > 0) {
        return result;
    }
    return 'No users found';
}

const createUser = (user) => {
    demoHelper('createUser');
    const { username, password, email } = user;
    return 'Creating a user';
}

const updateUser = (user) => {
    demoHelper('updateUser');
    const { username, password, email } = user;
    return 'Updating a user';
}

const deleteUser = async (user) => {
    demoHelper('deleteUser');

    const result = await User.deleteOne({ username: user.username });
    if (result) {
        return 'User deleted';
    }
    return 'User not found';
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}