var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");

autoIncrement.initialize(connection);

var commentSchema = new Schema({
  user : {type: String, required: true},
  text: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

var postSchema = new Schema({
  user: {type: String, required: true},
  text: {type: String, required: true},
  // Creates comment array by default
  comments: {type: [commentSchema]},
  created: {type: Date, default: Date.now}
});

postSchema.plugin(autoIncrement.plugin, 'Message');
var Post = connection.model('Post', postSchema);

module.exports = Post;