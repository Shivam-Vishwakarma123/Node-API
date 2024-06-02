
const express = require('express')
const user_router = express.Router()
const userController =   require('../controllers/user.controller');

// Resister
user_router.post('/register', userController.register);

// login
user_router.post('/login', userController.login);

module.exports = user_router