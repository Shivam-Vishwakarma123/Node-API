'use strict';

const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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