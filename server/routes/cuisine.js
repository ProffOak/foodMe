//Require the express package and use express.Router
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Cuisine = require("../models/cuisine");





router.get('/', (req,res) => {
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



router.post("/", checkAuth, (req, res, next) => {

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

router.delete("/:id", checkAuth, (req, res, next) => {
    const id = req.params.id;
    Quisine.remove({_id: id}, (err, quisine) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).send("Deleted successfully")
        }
    })
});
*/

function validateCuisine(cuisine) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(cuisine, schema);
}


module.exports = router;