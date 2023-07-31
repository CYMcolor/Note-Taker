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
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET req for notes
app.get('/api/notes', (req, res) => {
    //send message to client
    res.json(`${req.method} request recieved to get notes`);
    //log to terminal
    console.info(`${req.method} request received to get notes`);
});

// listen to port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
