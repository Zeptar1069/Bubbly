const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userID: { type: String, required: true },
    check: { type: Number },
});

const model = mongoose.model('Daily', schema);

module.exports = model;