// Controllrts/playlistController.js

const Playlist = require('../models/Playlist');

exports.uploadPlaylist = async (req, res) => {
    const { playlistName, genre, artist, PrivacySettings, songIds } = req.body;
    console.log("Received data:", req.body);
    const imageFile = req.files.imagePlaylist[0];

    try {
        if (!Array.isArray(songIds) || songIds.length < 2) {
            return res.status(400).json({ error: 'A playlist must contain at least 2 songs.' });
        }
            
        const newPlaylist = new Playlist({
            name: playlistName,
            genre: genre,
            artist,
            privacy: PrivacySettings,
            songs: songIds,
            imagePlaylist: imageFile.filename,
        });


        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        console.error('Error uploading playliat:', error);
        res.status(500).send('Internal Server Error');
    }
};
