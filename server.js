// Import stuff
const express = require('express');
const db = require('./db/db.json');

//init stuff
const PORT = process.env.PORT || 3001;
const app = express();

// middle ware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//apply middle ware
app.use('/api', app);
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);