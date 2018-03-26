//Require mongoose package
const mongoose = require('mongoose');

//Define ItemSchema with title, description and category
const ItemSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: String,
    category: {
        type: String,
        enum: ['High', 'Medium', 'Low']
    }
});


const Item = module.exports = mongoose.model('Item', ItemSchema );
//BucketList.find() returns all the items
module.exports.getAllItems = (callback) => {
    Item.find(callback);
};
//newList.save is used to insert the document into MongoDB
module.exports.addItem = (newItem, callback) => {
    newItem.save(callback);
};

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteItemById = (id, callback) => {
    let query = {_id: id};
    Item.remove(query, callback);
};