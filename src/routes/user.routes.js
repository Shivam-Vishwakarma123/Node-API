
const express = require('express')
const user_router = express.Router()
const userController =   require('../controllers/user.controller');


// login
user_router.post('/login', userController.login);

module.exports = user_router