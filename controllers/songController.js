const Song = require('../models/song');

exports.uploadSong = async (req, res) => {
  const { songName, artistName, genre, albumName, releaseDate, keywords, lyrics } = req.body;
  const songFile = req.files.songFile[0];
  const imageFile = req.files.imageFile[0];

  try {
    const newSong = new Song({
      songName: songName,
      artistName: artistName,
      genre: genre,
      albumName: albumName,
      releaseDate: releaseDate,
      keywords: keywords,
      lyrics: lyrics,
      songFileId: songFile.filename,
      imageFileId: imageFile.filename
    });

    console.log("Received data:", req.body);
     const savedSong = await newSong.save();
    res.status(500).json(savedSong);
  } catch (error) {
    console.error('Error uploading song:', error);
    res.status(500).send('Internal Server Error');
  }
};