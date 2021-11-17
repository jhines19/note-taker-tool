const express = require('express');
const path = require('path');
//todo: add in api and change it to routes/index.js
const db = require('./Develop/db/db.json')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//GET Route for home page
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

//GET Route for notes page
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


