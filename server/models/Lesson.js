const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    them: {
        ref: 'thems',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('lessons',lessonSchema);