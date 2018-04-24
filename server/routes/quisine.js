//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const recipes = [
    {id: 1, name: 'Köttbullar', description: 'Ett bra recept för bullar'},
    {id: 2, name: 'Gubbröra', description: 'Röra för gubbar som gör dig strong.'}
    ];

router.get('/',(req,res) => {
   res.send(recipes);

});

router.get('/:id', (req, res) => {
    const recipe = recipes.find(c => c.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).send('recipe with the given id, not fpund');
    res.send(recipe);
});

module.exports = router;