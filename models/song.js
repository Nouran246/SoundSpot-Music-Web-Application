// /models/song.js

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songName: { type: String, required: true },
    artistName: { type: String, required: true },
    genre: { type: String, required: true },
    albumName: { type: String, required: true },
    releaseDate: { type: Date, required: true },
/*     keywords: { type: [String], required: true },
 */    lyrics: { type: String },
    songFileId: { type: String, required: true },
    imageFileId: { type: String, required: true },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
