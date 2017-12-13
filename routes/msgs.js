var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var Message = require(path.join(__dirname, '../models/messageSchema'));

router.get('/', (req, res) => {
  Message.find({}, function (e, msgs) {
    if (e) {
      throw e;
    } else {
      res.json(msgs);
    }
  });
});

router.post('/', (req, res) => {
  var newMessage = new Message({
    user: req.body.user,
    text: req.body.text,
  });

  newMessage.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.end();
    }
  });
});


module.exports = router;