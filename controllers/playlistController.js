// Controllrts/playlistController.js

const Playlist = require('../models/Playlist');

exports.uploadPlaylist = async (req, res) => {
    const { playlistName, genre, PrivacySettings, songIds } = req.body;
    console.log("Received data:", req.body);
    const imageFile = req.files.imagePlaylist[0];

    try {

        const newPlaylist = new Playlist({
            name: playlistName,
            genre: genre,
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
