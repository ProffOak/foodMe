// We’ll declare all our dependencies here
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Own dependencies
const item = require('./routes/item');
const hero = require('./routes/hero');
const user = require('./routes/user');
const recipe = require('./routes/recipe');
const cart = require('./routes/cart');


const config = require('./config/database');


//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Middelware for CORS
app.use(cors());

// * Enabels all origins (Not safe!)
app.options('*', cors());

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
app.use('/hero', hero);

app.use('/users', user);
app.use('/recipes', recipe);

app.use('/carts', cart);


app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});