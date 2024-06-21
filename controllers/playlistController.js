// Controllrts/playlistController.js

const Playlist = require('../models/Playlist');

// Upload in DB (POST)
exports.uploadPlaylist = async (req, res) => {
    const { playlistName, genre, PrivacySettings, songIds } = req.body;
    console.log("Received data:", req.body);
    const imageFiles = req.files.imagePlaylist;

    const errors = {};

    if (!playlistName) {
        errors.playlistName = 'Please enter the playlist name';
    } else if (typeof playlistName !== 'string' || !/^[a-zA-Z ]+$/.test(playlistName)) {
        errors.playlistName = 'Playlist name should only contain alphabets and spaces';
    } else {
        const existingPlaylist = await Playlist.findOne({ name: playlistName });
        if (existingPlaylist) {
            errors.playlistName = 'Playlist name already in use';
        }
    }

    if (!imageFiles || imageFiles.length !== 1) {
        errors.imagePlaylist = 'Please upload exactly one image for the playlist';
    }
    else {
        const imageFile = imageFiles[0];
        if (!imageFile.mimetype.startsWith('image')) {
            errors.imagePlaylist = 'Please upload an image file';
        }
    }

    if (imageFiles && imageFiles.length > 1) {
        errors.imagePlaylist = 'Multiple image files are not allowed';
    }

    if (!genre) {
        errors.genre = 'Please select a genre';
    }

    if (!PrivacySettings) {
        errors.privacy = 'Please select privacy settings';
    }

    if (!Array.isArray(songIds) || songIds.length < 3) {
        errors.songs = 'Please add at least three songs';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validation error. Please check your input.', errors });
    }

    try {
        const imageFile = imageFiles[0];

        const newPlaylist = new Playlist({
            name: playlistName,
            genre: genre,
            privacy: PrivacySettings,
            songs: songIds,
            imagePlaylist: imageFile.filename,
        });


        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (error) {
        console.error('Error uploading playliat:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Display  (GET)
exports.getPlaylist = async (req, res) => {
    try {
        const playlists = await Playlist.find().populate('songs');
        if (req.session.user) {
            res.render("AdminPart/managePlaylist", {
                currentPage: "managePlaylist",
                user: req.session.user,
                playlists: playlists,
            });
        } else {
            res.redirect("/");s
        }
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).send("Internal Server Error");
    }
};