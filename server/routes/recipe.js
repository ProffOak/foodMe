const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe");

// Handle incoming GET requests to /users, also supports query params
router.get("/", (req, res, next) => {
    if("random" in req.query && "limit" in req.query) {
        let query = req.query;
        const limit = parseInt(req.query.limit);
        delete query.random;
        delete query.limit;
        Recipe.count(query, (err, count) => {
            // Random number between count-limit and 1
            const r = Math.floor(Math.random() * (count-limit -1) + 1);
            console.log("r:"+r+" count:"+count);
            Recipe.find(query).limit(limit).skip(r).exec((err, recipes) => {
                if(err) {
                    res.status(500).json({error: err});
                    res.end();
                }else {
                    res.status(200).json(recipes);
                    res.end();
                }
            });

        });

    } else {
        Recipe.find(req.query, (err, recipes) => {
            if(err) {
                res.status(500).json({error: err});
            }else {
                res.status(200).json(recipes);
                res.end();
            }
        });
    }

});


// Get user by id (not the id in the mongoose database)
router.get("/:id", (req, res, next) => {
    Recipe.findOne({_id: req.params.id}, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
            res.end();
        }else {
            res.status(200).json(user);
            res.end();
        }
    });
});



router.post("/", (req, res, next) => {
    Recipe.create(req.body, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
            res.end();
        } else {
            res.status(200).json(user);
            res.end();
        }
    });
});

// Update Certain fields of the user object
router.patch("/", (req, res, next) => {
    let query=req.query;
    if(Object.keys(query).length === 0) {
        query={uid: req.body._id}
        if(!query){
            res.status(500).json({error: 'missing query params'});
            res.end();
        }
    }
    patchUser(query, req, res)
});

router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    patchUser({_id: id}, req, res)
});

function patchUser(queryObj, req, res) {
    const options= {setDefaultsOnInsert:true, upsert: true, new:true, runValidators:true};
    Recipe.findOneAndUpdate(queryObj, { $set: req.body }, options, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(user)
        }
    });
}

router.delete("/:id", (req, res, next) => {
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