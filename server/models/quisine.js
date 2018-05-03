//Require mongoose package
const mongoose = require('mongoose');

//Define ItemSchema with title, description and category
const QuisineSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Quisine', QuisineSchema);

