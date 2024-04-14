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

    if (results.length > 0) {
        return results[0];
    } else {
        return { message: 'User not found' };
    }
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

const deleteUser = async (user) => {
    demoHelper('deleteUser');
    // Without ORM
    const results = await db.query('DELETE FROM users WHERE username = ?', [user.username])
        .then(([rows, fields]) => {
            return rows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

    if (results.affectedRows > 0) {
        return 'User deleted';
    }
    return 'Failed to delete a user';
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}