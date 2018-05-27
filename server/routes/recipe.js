const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe");

const checkAuth = require('../middleware/check-auth');


// Handle incoming GET requests to /users, also supports query params
router.get("/", (req, res, next) => {
    const random = req.query.random;
    let limit = parseInt(req.query.limit);
    // Remove random and limit fields from query that are not present att Recipe model
    delete req.query.random;
    delete req.query.limit;
    // Handle result from queries
    const handler = function (err, recipes) {
        if(err) {
            res.status(500).json({error: err});
        }else {
            res.status(200).json(recipes);
            res.end();
        }
    };
    if(random && random.toLowerCase() === "true") {
        if(!limit) limit = 50;
        console.log(Array.isArray(req.query.quisines));
        if (Array.isArray(req.query.quisines) === true) {
            req.query.quisines={ $in: req.query.quisines};
            console.log(req.query);
        }
       Recipe.findRandom(req.query, {}, {limit: limit, populate: 'quisines'}, handler);
    }else {
        Recipe.find(req.query).limit(limit).exec(handler);
    }
});

// Get Recipe by _id
router.get("/:id", (req, res, next) => {
    Recipe.findOne({_id: req.params.id}).populate('quisines').exec((err, user) => {
        if(err) {
            res.status(500).json({error: err});
            res.end();
        }else {
            res.status(200).json(user);
            res.end();
        }
    });
});



router.post("/", checkAuth, (req, res, next) => {
    // You can only create a recipe with your own uid, else send 401
    if(!(req.body.uid === req.uid)){
        res.status(401).json({error: 'Uid do not match'});
        res.end();
        return;
    }
    Recipe.create(req.body, (err, recipe) => {
        if(err) {
            res.status(500).json({error: err});
            res.end();
        } else {
            res.status(200).json(recipe);
            res.end();
        }
    });
});

// Update Certain fields of the user object, query by params is allowed
router.patch("/", checkAuth, (req, res, next) => {
    console.log(req.req);
    let query=req.query;
    if(Object.keys(query).length === 0) {
        query={uid: req.body._id};
        if(!query){
            res.status(500).json({error: 'missing query params'});
            res.end();
        }
    }
    patchRecipe(query, req, res)
});

router.patch("/:id", checkAuth, (req, res, next) => {
    const id = req.params.id;
    patchRecipe({_id: id}, req, res)
});

function patchRecipe(queryObj, req, res) {
    const options= {setDefaultsOnInsert:true, upsert: true, new:true, runValidators:true};
    Recipe.findOneAndUpdate(queryObj, { $set: req.body }, options, (err, recipe) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(recipe)
        }
    });
}

router.delete("/:id", checkAuth, (req, res, next) => {
    const id = req.params.id;
    Recipe.remove({_id: id}, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).send("Deleted successfully")
        }
    })
});

module.exports = router;