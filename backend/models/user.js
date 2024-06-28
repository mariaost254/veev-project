const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../databases/users.json');

const getAllUsers = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading users file: ${error.message}`);
    }
};

const getUserByEmail = async (email) => {
    try {
        const users = await getAllUsers();
        return users.find(user => user.email === email);
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
};

const addUser = async (newUser) => {
    try {
        const users = await getAllUsers();
        const existingUser = users.find(user => user.email === newUser.email);

        if (existingUser) {
            throw new Error('Cannot create user');
        }

        users.push(newUser);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
        throw new Error(`Error saving user: ${error.message}`);
    }
};

const userExists = async (email) => {
    try {
        const user = await getUserByEmail(email);
        return user !== undefined;
    } catch (error) {
        throw new Error(`Error checking if user exists: ${error.message}`);
    }
};

const deleteUserByEmail = async (email) => {
    try {
        let users = await getAllUsers();
        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex === -1) {
            throw new Error('User not found');
        }

        users.splice(userIndex, 1); 
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};


module.exports = {
    getUserByEmail, addUser, userExists, deleteUserByEmail
};