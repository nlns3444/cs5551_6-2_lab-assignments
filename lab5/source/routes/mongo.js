
var mongodb         = require('mongoose');

// Connect to mongo
mongodb.connect('mongodb://localhost/chatrooms');

var Schema = mongodb.Schema;
var ObjectId = Schema.ObjectId;

var Users = mongodb.model('Users', new Schema({
    id: ObjectId,
    firstname: String,
    lastname: String,
    email: { type: String, unique: true},
    password: String
}));

module.exports.Users = Users;
