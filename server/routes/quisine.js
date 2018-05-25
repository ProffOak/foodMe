//Require the express package and use express.Router
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Quisine = require("../models/quisine");
const checkAuth = require('../middleware/check-auth');




router.get('/', (req,res) => {
   //res.send(recipes);
    Quisine.find((err, quisines) => {
        if(err) {
            res.status(500).json({error: err});
        }else {
            res.status(200).json(quisines);
            res.end();
        }
    });
   //res.send()

});



router.post("/", checkAuth, (req, res, next) => {

    const { error } = validateQuisine(req.body);
    if (error) {
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const newQuisine = new Quisine({
        name: req.body.name
    });
    Quisine.create(newQuisine, (err, quisine) => {
        if(err) {
            res.status(400).json({error: err});
            res.end();
        } else {
            res.status(200).json(quisine);
            res.end();
        }
    });
});


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

function validateQuisine(quisine) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(quisine, schema);
}


module.exports = router;