
const { demoHelper } = require('../utils/helper');

const getUser = (user) => {
    demoHelper('getUser');
    const { username } = user;
    return 'Getting a user';
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
    createUser,
    updateUser,
    deleteUser
}