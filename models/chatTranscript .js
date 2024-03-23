const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatTranscriptSchem = new Schema({
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    para: { type: String, required: true },
    resolved: { type: Boolean, default: false }
});

const chatTranscript  = mongoose.model('chatTranscript ', chatTranscriptSchem);

module.exports = chatTranscript ;
