'use strict';
var dbConn = require('./../../config/db.config');

//User object create
var User = function (user) {
  this.user_name = user.user_name;
  this.password = user.password;
  this.created_at = new Date();
  this.updated_at = new Date();
};

User.findByUserName = function (user, result) {
  dbConn.query('SELECT * FROM user WHERE user_name = ?', user.user_name, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.register = function (user, result) {
  dbConn.query('INSERT INTO user (user_name, password) VALUES (?, ?)', [user.user_name, user.password], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

User.login = function (user, result) {
  console.log('hii_user', user)
  dbConn.query('SELECT * FROM user WHERE user_name = ?', [user.user_name], function (err, res) {
    if (err) {
      result(err, null);
    }
    else {
      result(null, res[0]);
    }
  });
};

module.exports = User;