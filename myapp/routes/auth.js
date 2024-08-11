const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour l'inscription
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, username, birthdate, nationality, city, country, favoriteGenres, bio, profilePhoto } = req.body;
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      username,
      birthdate,
      nationality,
      city,
      country,
      bio,
      profilePhoto,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Créer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour la configuration du profil
router.post('/profile-setup', authMiddleware, async (req, res) => {
    const { username, birthdate, nationality, city, country, favoriteGenres, bio, profilePhoto } = req.body;

    try {
        const user = await User.findById(req.user.userId);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        user.birthdate = birthdate;
        user.nationality = nationality;
        user.city = city;
        user.country = country;
        user.bio = bio;
        user.profilePhoto = profilePhoto;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route pour obtenir les informations de l'utilisateur
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;