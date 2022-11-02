const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    collec: {
        type: String,
        required: false
    },
    listing_id: {
        type: String,
        required: false
    },

}, {timestamps: true});

module.exports = mongoose.model('SingleFile', singleFileSchema);