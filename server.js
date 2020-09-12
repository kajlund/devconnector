const dotenv = require('dotenv');
const express = require('express');

// Read environment variables
dotenv.config();

const { connectDB } = require('./db');
const log = require('./utils/logger');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => log.info(`Server started on port ${PORT}`));
