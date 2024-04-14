const db = require('../database');
const { demoHelper } = require('../utils/helper');

const getUser = async (user) => {
    demoHelper('getUser');

    // Without ORM
    const results = await db.query('SELECT * FROM users WHERE username = ?', [user.username])
        .then(([rows, fields]) => {
            return rows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

    return results;
}

const getAllUsers = async () => {
    demoHelper('getAllUsers');

    // Without ORM
    const results = await db.query('SELECT * FROM users')
        .then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

    return results;
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

const deleteUser = (user) => {
    demoHelper('deleteUser');
    const { username } = user;
    return 'Deleting a user';
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}