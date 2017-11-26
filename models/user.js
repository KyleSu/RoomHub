var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var connection = mongoose.createConnection("mongodb://localhost/cis197finalproject");


var userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.addUser = function(username, password, cb) {
  console.log("Finding user");
  User.findOne({username: username}, function (err, user) {
    if (err) {
      console.log("error");
      console.log(err);
      cb(err);
    }
    if (!user) {
      console.log("adding user");
      var newUser = new User({ username: username, password: password});
      newUser.save(cb);
    } else {
      console.log("user exixsts");
      cb("User already exists");
    }
  })
}

userSchema.statics.checkIfLegit = function(username, password, cb) {
  User.findOne({ username: username }, function(err, user) {
    if (!user) {
      console.log("Couldn't find user");
      cb(null, false);
    }
    else {
      bcrypt.compare(password, user.password, function(err, isRight) {
        if (err) return cb(err);
        console.log("Incorrect password");
        cb(null, isRight);
      });
    };
  });
}

var User = connection.model('User', userSchema);

module.exports = User;