require('dotenv').config();
const routes = require('./routes/routes.js');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const jwt = require('jsonwebtoken');
mongoose.connect(mongoString);
const database = mongoose.connection;

const bcrypt = require('bcrypt');

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Sample route to create a user (registration)
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const newUser = new User({ username, password });
    await newUser.save();
  
    res.status(201).json({ message: 'User registered successfully' });
  });
  
  // Sample route for user login and generating JWT
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username, password });
  
    if (user) {
      // Create and send a JWT
      const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  // Sample route that requires authorization
  app.get('/protected', authorize, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
  });
  
  // Middleware to check JWT and authorize requests
  function authorize(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  }
  