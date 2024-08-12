require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Configurer les sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Utilisation de `process.env.NODE_ENV` pour vérifier si on est en production
}));

// Connect to MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Simple route
app.get('/', (req, res) => {
  res.send('Welcome to ZikNet');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
