const express = require('express');
const router = express.Router();
const Promise = require('promise');

const ProductService = require('./services/productService');

/* GET products listing. */
router.get('/get-products/:categoryId', function(req, res, next) {
  
    try{
        let productsResult = ProductService.getProducts(req.params.categoryId);
        
        productsResult
        .then(function(data){
            res.send(data);
        })
        .catch(function(err){
            res.status(500).send('Caught error fetching products.', err);
        });
    }
    catch(err){
        res.status(500).send('Caught error fetching products.', err);
    }
});

module.exports = router;