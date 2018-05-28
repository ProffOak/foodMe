//Require mongoose package
const mongoose = require('mongoose');

//Define ItemSchema with title, description and category
const CuisineSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Cuisine', CuisineSchema);

