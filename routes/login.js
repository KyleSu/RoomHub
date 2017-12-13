var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var User = require(path.join(__dirname, '../models/userSchema.js'));

router.post('/', function(req, res) {
  username = req.body.username;
  password = req.body.password;
  User.checkIfLegit(username, password, function(err, isRight) {
    if (err) {
      throw err;
    } else {
      if (isRight) {
        res.json({
          valid: true,
          username: username
        });
      } else {
        res.json({
          valid: false
        });
      }
    }
  });

});

module.exports = router;
