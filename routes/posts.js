var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");
var Post = require(path.join(__dirname, '../models/postSchema.js'));


router.post('/new', function(req, res) {

  var newPost = new Post({
    user: req.body.user,
    text: req.body.text
  });

  newPost.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.end();
    }
  })
});

router.post('/update', function(req, res) {

  Post.findById(req.body.id, function (err, post) {
    if (err) {
      throw err;
    } else if (!post) {
      console.log('Post to update could not be found, id: ' + req.body.id);
    } else {
      post.comments.push({user: req.body.user, text: req.body.text});
      post.save(function (err) {
        if (err) {
          throw err;
        } else {
          res.end();
        }
      });
    }
  });
});

router.get('/', (req, res) => {
  Post.find({}, function (e, posts) {
    if (e) {
      throw e;
    } else {
      res.json(posts);
    }
  });
});

module.exports = router;