const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Handle incoming GET requests to /users, also supports query params
router.get("/", (req, res, next) => {
    User.find(req.query, (err, users) => {
        if(err) {
            res.status(500).json({error: err});
        }else {
            res.status(200).json(users);
            res.end();
        }
    });
});



// Get user by id (not the id in the mongoose database)
router.get("/:id", (req, res, next) => {
    User.findOne({_id: req.params.id}, (err, user) => {
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
    const newUser = new User({
        uid: req.body.uid,
        email: req.body.email,
        emailVerified: req.body.emailVerified,
        createdAt: req.body.createdAt,
        lastLoginAt: req.body.lastLoginAt,
        name: req.body.name,
        roles: req.body.roles
    });
    User.create(newUser, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
            res.end();
        } else {
            res.status(200).json(user);
            res.end();
        }
    });
});

// Update Certain fields of the user object, query params allowed
router.patch("/", (req, res, next) => {
    let query=req.query;
    // Find object to update based on uid
    if(Object.keys(query).length === 0) {
        query={uid: req.body.uid}
    }
    patchUser(query, req, res)
});

router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    patchUser({_id: id}, req, res)
});

// Help function to update a user
function patchUser(queryObj, req, res) {
    const options= {setDefaultsOnInsert:true, upsert: true, new:true, runValidators:true};
    User.findOneAndUpdate(queryObj, { $set: req.body }, options, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(user)
        }
    });
}
// Delete a user based on id from url
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    User.remove({_id: id}, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json({status:"Deleted successfully"})
        }
    })
});


module.exports = router;