const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Handle incoming GET requests to /users
router.get("/", (req, res, next) => {
    User.find((err, users) => {
       if(err) {
           res.status(500).json({error: err});
       }else {
           res.status(200).json(users);
           res.end();
       }
    });
});

// Get user by uid (not the id in the mongoose database)
router.get("/:uid", (req, res, next) => {
    User.findOne({uid: req.params.uid}, (err, user) => {
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

// Update Certain fields of the user object
router.patch("/:uid", (req, res, next) => {
    const id = req.params.uid;
    const updateOps = {};
    for(const key in req.body) {
        if(req.body.hasOwnProperty(key)){
            updateOps[key] = req.body[key]
        }
    }
    User.update({ uid: id }, { $set: updateOps }, (err, user) => {
       if(err) {
           res.status(500).json({error: err});
       } else {
           res.status(200).json(user)
       }
    });
});

router.delete("/:uid", (req, res, next) => {
    const uid = req.params.uid;
    User.remove({uid: uid}, (err, user) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).send("Deleted successfully")
        }
    })
});


module.exports = router;