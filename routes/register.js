var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var User = require(path.join(__dirname, '../models/userSchema.js'));


router.post('/', function(req, res) {
  User.addUser(req.body.username, req.body.password, function(err) {
    if (err) {
      throw err;
      res.json({
        failed: true,
        error: err
      });
    } else {
      res.json({
        failed: false,
        username: req.body.username
      });
    }
  });
});

module.exports = router;