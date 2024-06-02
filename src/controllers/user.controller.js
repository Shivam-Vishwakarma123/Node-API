'use strict';

// Import reuired library
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.login = function (req, res) {
    const new_user = new User(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide correct credentials' });
    } else {
        User.login(new_user, function (err, User) {
        if (err)
          res.send(err);
        const user = { id: User[0].id, username: User[0].user_name };
        jwt.sign(user, 'your_secret_key', (err, token) => {
            if (err) return res.sendStatus(500);
            res.json({ error: false, message: "User verified successfully!", data: User, token: token });
        });
      });
    }
};

exports.register = function (req, res) {
  const newUser = new User(req.body);

  if (!newUser.user_name || !newUser.password) {
    return res.status(400).send({ error: true, message: 'Please provide user_name and password' });
  }

  User.findByUserName(newUser, function (err, registered_user) {
    if (err) {
      return res.status(500).send({ error: true, message: 'Database error' });
    }

    if (registered_user.length > 0) {
      return res.status(400).send({ error: true, message: 'User already exists' });
    } else {
      User.register(newUser, function (err, userId) {
        if (err) {
          return res.status(500).send({ error: true, message: 'Database error' });
        }
        return res.send({ error: false, message: 'User registered successfully', data: { id: userId } });
      });
    }
  });
};