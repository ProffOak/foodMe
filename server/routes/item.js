//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const item = require('../models/item');


//GET HTTP method to /item
router.get('/',(req,res) => {
    item.getAllItems((err, items)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all Items. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, items:items},null,2));
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
    let newItem = new item({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });
    item.addItem(newItem,(err, item) => {
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
    item.deleteItemById(id,(err,list) => {
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