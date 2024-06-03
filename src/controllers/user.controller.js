'use strict';

// Import reuired library
const bcrypt = require('bcrypt');
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
      if (User.length === 0) {
        return res.status(400).send({ error: true, message: 'User not found' });
      }
      bcrypt.compare(new_user.password, User.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send({ error: true, message: 'Error comparing passwords' });
        }

        if (!isMatch) {
          return res.status(400).send({ error: true, message: 'Incorrect password' });
        }
        const tokenPayload = { id: User.id, username: User.user_name };
        jwt.sign(tokenPayload, 'your_secret_key', (err, token) => {
          if (err) return res.sendStatus(500);
          res.json({ error: false, message: "User verified successfully!", data: User, token: token });
        });
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
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          // Store hash password in DB.
          newUser.password = hash;
          User.register(newUser, function (err, userId) {
            if (err) {
              return res.status(500).send({ error: true, message: 'Database error' });
            }
            return res.send({ error: false, message: 'User registered successfully', data: { id: userId } });
          });
        });
      });
    }
  });
};