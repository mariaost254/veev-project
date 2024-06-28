const express = require("express");
const router = express.Router();
const { signup, login, deleteUser } = require('../controllers/userController');


router.post('/register', signup);
router.post('/login', login);
router.delete('/delete', deleteUser);

module.exports = router;
