const mongoose = require('mongoose');

//Define ItemSchema with title, description and category
const HeroSchema = mongoose.Schema({
    name: String,
    description: String,
    age: Number,
});


const Hero = module.exports = mongoose.model('Hero', HeroSchema );
//BucketList.find() returns all the items
module.exports.getAllHeroes = (callback) => {
    Hero.find(callback);
};
//newList.save is used to insert the document into MongoDB
module.exports.addHero = (newHero, callback) => {
    newHero.save(callback);
};

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteHeroById = (id, callback) => {
    let query = {_id: id};
    Hero.remove(query, callback);
};