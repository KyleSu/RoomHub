var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var Message = require(path.join(__dirname, '../models/message'));

router.get('/', (req, res) => {
  Message.find({}, function (e, msgs) {
    if (e) {
      throw e;
    } else {
      console.log(msgs);
      res.json(msgs);
    }
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  var newMessage = new Message({
    user: req.body.user,
    text: req.body.text,
  });

  newMessage.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log('msg saved');
    }
  });
});


module.exports = router;