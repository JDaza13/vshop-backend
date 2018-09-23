const express = require('express');
const router = express.Router();
const Promise = require('promise');

const categoryService = require('./services/categoryService');

/* GET categories listing. */
router.get('/get-categories', function(req, res, next) {
  
    try{
        let categoriesResult = categoryService.getCategories(req.query);
        
        categoriesResult
        .then(function(data){
            res.send(data);
        })
        .catch(function(err){
            res.status(500).send('Caught error fetching categories.', err);
        });
    }
    catch(err){
        res.status(500).send('Caught error fetching categories.', err);
    }
});

module.exports = router;