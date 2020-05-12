const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const themSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('thems',themSchema);