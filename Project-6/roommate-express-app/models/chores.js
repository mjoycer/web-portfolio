const mongoose = require('mongoose');
const users = require('./users');

const Schema = mongoose.Schema;
const ChoresSchema = new Schema({
    name:  String,
    status: String,
    deadline: Date,
    users: [{type: Schema.Types.ObjectId, ref: users}]
});

module.exports = mongoose.model('chores', ChoresSchema);