const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = Log = mongoose.model('log', LogSchema);
