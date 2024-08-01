const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const path = require('path');
const bcrypt = require('bcrypt');

// Import the User model
const User = require('./models/User'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Simple route
app.get('/', (req, res) => {
  res.send('Welcome to ZikNet');
});

// Test the connection with the database
app.post('/api/auth/test', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Test user created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already used' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
