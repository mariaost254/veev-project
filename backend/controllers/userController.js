const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, addUser, userExists, deleteUserByEmail } = require('../models/user');
const { validatePassword } = require('../utils/passwordUtils');
const { NotAuthenticated } = require('../middleware/errors');

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if(await userExists(email)){
            return res.status(500).json({ message: 'Something went wrong' });
        }
        validatePassword(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: String(new Date().getTime()), 
            email,
            password: hashedPassword
        };

        await addUser(newUser);
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        if (error.message === 'Cannot create user') {
            res.status(400).json({ message: 'Cannot create user' });
        } else if (error.message === 'Password must contain at least one uppercase letter and one special character') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) {
            throw new NotAuthenticated('Auth failed');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new NotAuthenticated('Auth failed');
        }

        const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Auth successful', token });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        await deleteUserByEmail(email);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    signup,
    login,
    deleteUser
};