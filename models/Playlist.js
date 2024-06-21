// /models/Playlist.js

const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    },
    genre: {
        type: String, required: true,
    },
    privacy:
    {
        type: String, required: true,
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    }],
    imagePlaylist: { type: String, required: true },
});


const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
