const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  favoriteGenres: [String],
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String, // URL de la photo de profil
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);
// This model defines a User schema with the following fields:
// firstname: The user's first name
// lastname: The user's last name
// email: The user's email address
// password: The user's password
// username: The user's username
// birthdate: The user's birthdate
