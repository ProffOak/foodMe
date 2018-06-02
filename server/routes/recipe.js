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
    // Handle result from executed queries
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
        if (Array.isArray(req.query.cuisines) === true) {
            // Only get recipes with cuisines from the query array of cuisines
            req.query.cuisines={ $in: req.query.cuisines};
        }
        // Find maximum of limit recipes and populate them with the cuisines objects
       Recipe.findRandom(req.query, {}, {limit: limit, populate: 'cuisines'}, handler);
    }else {
        Recipe.find(req.query).limit(limit).exec(handler);
    }
});

// Get Recipe by _id
router.get("/:id", (req, res, next) => {
    Recipe.findOne({_id: req.params.id}).populate('cuisines').exec((err, recipe) => {
        if(err) {
            res.status(500).json({error: err});
            res.end();
        }else {
            res.status(200).json(recipe);
            res.end();
        }
    });
});


// Includes checkAuth to make sure user is logged in
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

// Update Certain fields of the recipe object, query by params is allowed
router.patch("/", checkAuth, (req, res, next) => {
    let query=req.query;
    if(!query){
        res.status(500).json({error: 'missing query params'});
        res.end();
    }
    patchRecipe(query, req, res)
});

router.patch("/:id", checkAuth, (req, res, next) => {
    const id = req.params.id;
    patchRecipe({_id: id}, req, res)
});

// Help function to execute patch from either id or query params
function patchRecipe(queryObj, req, res) {
    // Create a new document if no document found
    const options= {setDefaultsOnInsert:true, upsert: true, new:true, runValidators:true};
    Recipe.findOneAndUpdate(queryObj, { $set: req.body }, options, (err, recipe) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(recipe)
        }
    });
}
// Remove a recipe based on id
router.delete("/:id", checkAuth, (req, res, next) => {
    const id = req.params.id;
    Recipe.remove({_id: id}, (err, recipe) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json({status:"Deleted successfully"})
        }
    })
});

module.exports = router;