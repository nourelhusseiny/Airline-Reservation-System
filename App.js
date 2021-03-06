const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const flights = require('./routes/api/flights');
const users = require('./routes/api/users');
const userflights = require('./routes/api/userflights');


const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/flights', flights);
app.use('/api/users', users);
app.use('/api/userflights', userflights);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));