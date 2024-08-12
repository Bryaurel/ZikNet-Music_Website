const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour l'inscription
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword });

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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user._id;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour la configuration du profil
router.post('/profile-setup', authMiddleware, async (req, res) => {
  const { firstname, lastname, email, phone, nationality, country, city, birthday, bio, username, contactMethod, gender, cv } = req.body;

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.nationality = nationality || user.nationality;
    user.country = country || user.country;
    user.city = city || user.city;
    user.birthday = birthday || user.birthday;
    user.bio = bio || user.bio;
    user.username = username || user.username;
    user.contactMethod = contactMethod || user.contactMethod;
    user.gender = gender || user.gender;
    user.cv = cv || user.cv; // À mettre à jour avec une logique de gestion des fichiers si nécessaire

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour obtenir les informations de l'utilisateur
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour la déconnexion
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
