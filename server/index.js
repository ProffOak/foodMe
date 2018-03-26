// We’ll declare all our dependencies here
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Own dependencies
const item = require('./controllers/item');
const config = require('./config/database');


//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.databaseUri);

//Value of Port
const port = process.env.PORT || 3000;

// Example hello world
app.get('/',(req, res) => {
    res.send('Hello World');
});

// Example with params
app.get('/api/:name', (req, res) => {
    res.send(req.params.name);
});

//Routing all HTTP requests to /item to item controller
app.use('/item',item);


app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});