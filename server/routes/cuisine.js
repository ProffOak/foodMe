//Require the express package and use express.Router
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Cuisine = require("../models/cuisine");

const recipes = [
    {id: 1, name: 'Köttbullar', description: 'Ett bra recept för bullar'},
    {id: 2, name: 'Gubbröra', description: 'Röra för gubbar som gör dig strong.'}
    ];




router.get('/',(req,res) => {
   //res.send(recipes);
    Cuisine.find((err, cuisines) => {
        if(err) {
            res.status(500).json({error: err});
        }else {
            res.status(200).json(cuisines);
            res.end();
        }
    });
   //res.send()

});

router.get('/:id', (req, res) => {
    const recipe = recipes.find(c => c.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).send('recipe with the given id, not fpund');
    res.send(recipe);
});

router.post("/", (req, res, next) => {

    const { error } = validateCuisine(req.body);
    if (error) {
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const newCuisine = new Cuisine({
        name: req.body.name
    });
    Cuisine.create(newCuisine, (err, cuisine) => {
        if(err) {
            res.status(400).json({error: err});
            res.end();
        } else {
            res.status(200).json(cuisine);
            res.end();
        }
    });
});

/*
router.delete('/', (req, res) => {

    Cuisine.find({ name: req.body.name }, (err, res) => {
    if (err) {
        res.status(400).send(err.details[0].message);
        return;
    }
    Cuisine.remove({ name: req.body.name }, function (err, res) {
        res.status(200);
        });
    });
});
*/

function validateCuisine(cuisine) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(cuisine, schema);
}


module.exports = router;