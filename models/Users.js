const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  dob: {
    type: Date,
  },
  role: {
    type: String,
  },
  planType: {
    type: String,
  },
  planStartDate: {
    type: Date,
  },
  planRenewalDate: {
    type: Date,
  },
  billingInfo: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  totalListeningTime: {
    type: Number,
  },
  playlistsCreated: {
    type: Number,
  },
  songsUploaded: {
    type: Number,
  },
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  likedSongs: {
    type: Number,
  },
  recentlyPlayedSong: {
    type: String,
  },
  mostPlayedPlaylist: {
    type: String,
  },
  topGenre: {
    type: String,
  },
  lastSongFavorited: {
    type: String,
  },
  passwordStrength: {
    type: String,
  },
  passwordLastUpdated: {
    type: Date,
  },
  accountStatus: {
    type: String,
  },
  twoFactorAuth: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  },
  lastLoginIp: {
    type: String,
  },
  lastLoginDevice: {
    type: String,
  },
  recentPasswordChanges: {
    type: Array,
  },
  failedLoginAttempts: {
    type: Number,
  },
  accessedFromNewDevice: {
    type: Boolean,
  },
  lastAccess: {
    type: Date,
  }
});

module.exports = mongoose.model('User', userSchema);
