// Import stuff
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const { v4: uuidv4} =  require('uuid');
//init stuff
const PORT = process.env.PORT || 3001;
const app = express();

// middle ware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// // GET Route for anything wrong
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET req for notes
app.get('/api/notes', (req, res) => {
    //send message to client
    res.json(db);
    //log to terminal
    console.info(`${req.method} request received to get notes`);
});

// POST req to add notes
app.post('/api/notes', (req, res) => {
    // get req body info
    const { title, text } = req.body;
    //uuidv4() creates a random uniquie id for the note
    const newNote = { title, text, id: uuidv4()};
    //db is the joson file info
    db.push(newNote);
    // writes to db file (doesnt work without sync)
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 2));
    // the db file is stored as the response
    res.json(db);
    //log to terminal
    console.info(`${req.method} request received to post notes`);
});

// listen to port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
