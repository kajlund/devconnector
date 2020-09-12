const dotenv = require('dotenv');
const express = require('express');

// Read environment variables
dotenv.config();

const { connectDB } = require('./db');
const log = require('./utils/logger');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => log.info(`Server started on port ${PORT}`));
