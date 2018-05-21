const express = require("express");
const router = express.Router();

const cart = require("../models/cart");

// Handle incoming GET requests to /users, also supports query params
router.get("/", (req, res, next) => {
    cart.find(req.query, (err, users) => {
        if(err) {
            res.status(500).json({error: err});
        }else {
            res.status(200).json(users);
            res.end();
        }
    });
});

// Update Certain fields of the user object
router.patch("/", (req, res, next) => {
    let query=req.query;
    patchUser(query, req, res)
});

router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    patchUser({_id: id}, req, res)
});

function patchUser(queryObj, req, res) {
    const options= {setDefaultsOnInsert:true, upsert: true, new:true, runValidators:true};
    delete req.body._id;
    cart.findOneAndUpdate(queryObj, { $set: req.body }, options, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(user)
        }
    });
}

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    cart.remove({_id: id}, (err, cart) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).send("Deleted successfully")
        }
    })
});


module.exports = router;