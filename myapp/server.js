const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true},
    password: String,
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expres.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
   useNewUrlParser: true;
   useUnifiedTopology: true;
   userCreateIndex: true;
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

//test the connexion with the database
app.post('/api/auth/test', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newUser({ firstname, lastname, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Test user created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email aready used' });
        } else {
            res.status(500).json({message: 'Server error'});
        }
    }
});

module.exports = User;