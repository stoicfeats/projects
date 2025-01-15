const express = require('express');
const cors =  require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;
const habitRoutes = require('./routes/habits');
app.use('/api/habits', habitRoutes);

// Middlewares
app.use(cors());
app.use(express.json());    

// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Placeholder Route
app.get('/', (req, res) => {
  res.send('Welcome to the Habit Tracker Backend!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});