const mongoose = require('mongoose');

//Define ItemSchema with title, description and category
const CartSchema = mongoose.Schema({
    _id: String,
    uid: String,
    recipeIds: [String],
    isActive: Boolean,
    date: Date,
});

module.exports = mongoose.model('Cart', CartSchema);