const express = require('express');
const path = require('path');
//todo: add in api and change it to routes/index.js
const db = require('./Develop/db/db.json');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Develop/public'));

//GET Route for home page
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

//GET Route for notes page
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    let newNote = req.body; //the note is = to the body
    let noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8")); // generates a list of all notes and saves it to a var by reading current db

    //creates unique ids using uuid, woo
    newNote.id = uuid();
    
    noteList.push(newNote); //pushes our new note onto that array read from the db

    //write the updated data to db.json
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList)); //writes the list with newly added note, JSON's it and writes over the old db.
    res.json(noteList);

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


