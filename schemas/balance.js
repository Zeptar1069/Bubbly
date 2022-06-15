const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userID: { type: String, required: true },
    wallet: { type: Number, default: 500 },
    bank: { type: Number, default: 500 },
});

const model = mongoose.model('Balance', schema);

module.exports = model;