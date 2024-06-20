// /models/Playlist.js

const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    },
    genre: {
        type: String, required: true,
    },
    album: {
        type: [String], default: [],
    },
    artist: {
        type: [String], default: [],
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

playlistSchema.path('songs').validate(function (songs) {
    return songs.length >= 2;
}, 'A playlist must contain at least 2 songs.');

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
