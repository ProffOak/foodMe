//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const hero = require('../models/hero');


//GET HTTP method to /item
router.get('/',(req,res) => {
    hero.getAllHeroes((err, items)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all Items. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify(items));
            res.end();
        }
    });
});


//GET HTTP method to /item
router.get('/:id',(req,res) => {
    res.send("GET"+req.params.id);
});

//POST HTTP method to /item

router.post('/', (req,res,next) => {
    let newHero = new hero({
        name: req.body.name,
        description: req.body.description,
        age: req.body.age
    });
    hero.addHero(newHero,(err, item) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new Item. Error: ${err}`});
        }
        else
            res.json({success:true, message: "Added successfully."});
    });
});

//DELETE HTTP method to /item. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteItemById
    hero.deleteHeroById(id,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    })
});

module.exports = router;