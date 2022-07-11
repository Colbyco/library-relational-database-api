require('dotenv').config();
// const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 8080;
const library = require('./library');

app.use( express.json() )

app.post('/', async (req, res) => {
    const userInput = req.body.author_name
    res.send(await library.searchByAuthor(userInput))
});

app.listen(
    PORT,
    () => console.log(`Server Started`)
)