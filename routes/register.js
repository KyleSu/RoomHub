var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var User = require(path.join(__dirname, '../models/user.js'));


router.post('/', function(req, res) {
  console.log(req.body);
  User.addUser(req.body.username, req.body.password, function(err) {
    if (err) {
      console.log(err);
      res.json({
        failed: true,
        error: err
      });
    } else {
      console.log("sending pass json");
      res.json({
        failed: false,
        username: req.body.username
      });
    }
  });
});

module.exports = router;