var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");

autoIncrement.initialize(connection);

var messageSchema = new Schema({
    user: {type: String, required: true},
    text: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

messageSchema.plugin(autoIncrement.plugin, 'Message');
var Message = connection.model('Message', messageSchema);

module.exports = Message;