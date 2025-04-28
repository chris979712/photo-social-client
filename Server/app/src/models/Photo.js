const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Photo", PhotoSchema);
