var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var Todo = require(path.join(__dirname, '../models/todoSchema.js'));


router.post('/new', function(req, res) {

  var newTodo = new Todo({
    finished: false,
    text: req.body.text
  });
  newTodo.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.end();
    }
  })
});

router.post('/updateuser', function(req, res) {

  Todo.findById(req.body.id, function (err, todo) {
    if (err) {
      throw err;
    } else if (!todo) {
      console.log('Todo item to update could not be found');
    } else {
      todo.user = req.body.user;
      todo.save(function (err) {
        if (err) {
          throw err;
        } else {
          res.end();
        }
      });
    }
  });
});

router.post('/updatestatus', function(req, res) {
  Todo.findById(req.body.id, function (err, todo) {
    if (err) {
      throw err;
    } else if (!todo) {
      console.log('Todo item to update could not be found');
    } else {
      todo.finished = req.body.finished;
      todo.save(function (err) {
        if (err) {
          throw err;
        } else {
          res.end();
        }
      });
    }
  });
});

router.get('/unfinished', (req, res) => {
  Todo.find({ finished: false }, function (e, todos) {
    if (e) {
      throw e;
    } else {
      res.json(todos);
    }
  });
});

router.get('/finished', (req, res) => {
  Todo.find({ finished: true }, function (e, todos) {
    if (e) {
      throw e;
    } else {
      res.json(todos);
    }
  });
});

module.exports = router;