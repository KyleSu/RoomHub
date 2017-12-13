var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");

var todoSchema = new Schema({
  finished: {type: Boolean, required: true},
  text: {type: String, required: true},
  user: {type: String, default: ""}
});

var Todo = connection.model('Todo', todoSchema);

module.exports = Todo;