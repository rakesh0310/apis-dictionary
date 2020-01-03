const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    word: { type: String },
    relatedWords: [Object],
    defnitions: [Object],
    examples:[Object]
});

module.exports = mongoose.model('Word', wordSchema);