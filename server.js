// Import stuff
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

//init stuff
const PORT = process.env.PORT || 3001;
const app = express();

// middle ware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

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
    res.json(`${req.method} request recieved to get notes`);
    //log to terminal
    console.info(`${req.method} request received to get notes`);
});

// POST req to add notes
app.post('/api/notes', (req, res) => {
    // show post request in log
    console.info(`${req.method} request received to add a note`);
    // init variables of note
    const { title, text } = req.body;

    // check if all note info is present
    if ( title && text){
        // new note to save
        const newNote = { title, text};
    }
    
    // read db json file
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{

    });

});

// listen to port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
