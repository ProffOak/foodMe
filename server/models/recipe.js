const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');


const RecipeSchema = mongoose.Schema({
    name: String,
    uid: String,
    description: String,
    time:String,
    imgUrl:String,
    instructions:String,
    ingredients :[String],
    quisines: [{ type: Schema.Types.ObjectId, ref: 'Quisine' }]

});
RecipeSchema.plugin(random);

module.exports = mongoose.model('Recipe', RecipeSchema);