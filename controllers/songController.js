const Song = require('../models/song');

exports.uploadSong = async (req, res) => {
  const { songName, artistName, genre, albumName, releaseDate, keywords, lyrics,
    duration, recordLabel, songwriters, producers, composer, releaseType,
    collaborations, featuredArtists } = req.body;

  const errors = {};

  // Validate song details
  if (!songName) {
    errors.songName = 'Song name is required.';
  } else if (!/^[a-zA-Z0-9 ]+$/.test(songName)) {
    errors.songName = 'Song name should only contain letters, numbers, and spaces.';
  }

  if (!artistName) {
    errors.artistName = 'Artist name is required.';
  }

  if (!genre) {
    errors.genre = 'Genre is required.';
  }

  if (!albumName) {
    errors.albumName = 'Album name is required.';
  } else if (!/^[a-zA-Z ]+$/.test(albumName)) {
    errors.albumName = 'Album name should only contain letters and spaces.';
  }

  if (!releaseDate) {
    errors.releaseDate = 'Release date is required.';
  }

  if (!keywords) {
    errors.keywords = 'Keywords are required.';
  } else if (!/^[a-zA-Z ]+$/.test(keywords)) {
    errors.keywords = 'Keywords should only contain letters and spaces.';
  }

  if (!lyrics) {
    errors.lyrics = 'Lyrics are required.';
  } else if (!/^[a-zA-Z ]+$/.test(lyrics)) {
    errors.lyrics = 'Lyrics should only contain letters and spaces.';
  }

  if (!duration) {
    errors.duration = 'Duration is required.';
  } else if (!/^\d{2}:\d{2}$/.test(duration)) {
    errors.duration = 'Duration should be in mm:ss format.';
  }

  if (!recordLabel) {
    errors.recordLabel = 'Record label is required.';
  }

  if (!songwriters) {
    errors.songwriters = 'Songwriters are required.';
  } else if (!/^[a-zA-Z ]+$/.test(songwriters)) {
    errors.songwriters = 'Songwriters should only contain letters and spaces.';
  }

  if (!producers) {
    errors.producers = 'Producers are required.';
  } else if (!/^[a-zA-Z ]+$/.test(producers)) {
    errors.producers = 'Producers should only contain letters and spaces.';
  }

  if (!composer) {
    errors.composer = 'Composer is required.';
  } else if (!/^[a-zA-Z ]+$/.test(composer)) {
    errors.composer = 'Composer should only contain letters and spaces.';
  }

  if (!releaseType) {
    errors.releaseType = 'Release type is required.';
  }

  if (!collaborations) {
    errors.collaborations = 'Collaborations are required.';
  }

  if (!featuredArtists) {
    errors.featuredArtists = 'Featured artists are required.';
  } else if (!/^[a-zA-Z ]+$/.test(featuredArtists)) {
    errors.featuredArtists = 'Featured artists should only contain letters and spaces.';
  }

  // Check for song file
  if (!req.files.songFileId || req.files.songFileId.length === 0) {
    errors.songFile = 'Song file is required.';
  } else {
    const songFile = req.files.songFileId[0];
    if (!songFile) {
      errors.songFile = 'Song file is required.';
    } else if (!songFile.mimetype.startsWith('audio/')) {
      errors.songFile = 'Song file must be an audio file.';
    }
  }

  // Check for image file
  if (!req.files.imageFileId || req.files.imageFileId.length === 0) {
    errors.imageFile = 'Image file is required.';
  } else {
    const imageFile = req.files.imageFileId[0];
    if (!imageFile) {
      errors.imageFile = 'Image file is required.';
    } else if (!imageFile.mimetype.startsWith('image/')) {
      errors.imageFile = 'Image file must be an image.';
    }
  }

  // If there are validation errors, respond with errors
  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);
    return res.status(400).json(errors);
  }

  try {
    // Check if the song already exists in the database
    const existingSong = await Song.findOne({
      songName: songName,
      artistName: artistName,
      albumName: albumName
    });

    if (existingSong) {
      errors.songExists = 'This song already exists in the database.';
      console.log("Validation errors:", errors);
      return res.status(400).json(errors);
    }

    // Create a new song instance
    const newSong = new Song({
      songName: songName,
      artistName: artistName,
      genre: genre,
      albumName: albumName,
      releaseDate: releaseDate,
      keywords: keywords.split(',').map(keyword => keyword.trim()),
      lyrics: lyrics,
      duration: duration,
      recordLabel: recordLabel,
      songwriters: songwriters,
      producers: producers,
      composer: composer,
      releaseType: releaseType,
      collaborations: collaborations,
      featuredArtists: featuredArtists,
      songFileId: req.files.songFileId[0].filename,
      imageFileId: req.files.imageFileId[0].filename,
    });

    // Save the new song to the database
    const savedSong = await newSong.save();
    res.status(200).json(savedSong);
  } catch (error) {
    console.error('Error uploading song:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    if (req.session.user) {
      res.render("AdminPart/song", {
        currentPage: "song",
        user: req.session.user,
        songs: songs,
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send("Internal Server Error");
  }
};


// Delete 
exports.deleteSong = async (req, res) => {
  try {
      const { songIds } = req.body;
      if (!songIds || !Array.isArray(songIds)) {
          return res.status(400).send({ error: 'Invalid song IDs' });
      }

      await Song.deleteMany({ _id: { $in: songIds } });
      res.status(200).send({ message: 'Song(s) deleted successfully' });
  } catch (error) {
      console.error('Error deleting song(s):', error);
      res.status(500).send({ error: 'An error occurred while deleting song(s)' });
  }
};