const mongoose = require('mongoose');
const users = require('./users');

const Schema = mongoose.Schema;
const BillsSchema = new Schema({
    name: String,
    amount: Number,
    dueDate: Date,
    status: String,
    isNecessity: Boolean,
    users: [{type: Schema.Types.ObjectId, ref: users}]
});

module.exports = mongoose.model('bills', BillsSchema);