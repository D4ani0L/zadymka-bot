const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    }
});

module.exports = Log = mongoose.model('log', LogSchema);
