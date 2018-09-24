const express = require('express');
const router = express.Router();
const Promise = require('promise');

const CartService = require('./services/cartService');

/* GET products listing. */
router.get('/get-cart', function(req, res, next) {
  
    try{
        let cartResult = CartService.getCart();
        
        cartResult
        .then(function(data){
            res.send(data);
        })
        .catch(function(err){
            res.status(500).send('Caught error fetching cart items.', err);
        });
    }
    catch(err){
        res.status(500).send('Caught error fetching cart items.', err);
    }
});

router.put('/put-cart-items', function(req, res, next) {
  
  try{
    if(req.body.itemsArray){
      let cartItemsPutResult = CartService.putItems(req.body.itemsArray);
      
      cartItemsPutResult
        .then(function(data){
          res.send(data);
        })
        .catch(function(err){
          res.status(500).send('Caught error creating cart items.', err);
        });
    }
    else{
      res.status(400).send('Invalid request for creation of cart items.');
    }
  }
  catch(err){
    res.status(500).send('Caught error creating cart items.', err);
  }
});

router.post('/edit-cart-item/:itemId', function(req, res, next) {
  
  try{
    let cartItemEditResult = CartService.updateItem(req.body, req.params.itemId);
      
    cartItemEditResult
      .then(function(data){
        res.send(data);
      })
      .catch(function(err){
        res.status(500).send('Caught error editing a cart item.', err);
      });
  }
  catch(err){
    res.status(500).send('Caught error editing a cart item.', err);
  }
});

router.delete('/delete-cart-item/:itemId', function(req, res, next) {
  
  try{
    let cartItemDeleteResult = CartService.deleteItem(req.params.hotelId);
      
    cartItemDeleteResult
      .then(function(data){
        res.send(data);
      })
      .catch(function(err){
        res.status(500).send('Caught error deleting a cart item.', err);
      });
  }
  catch(err){
    res.status(500).send('Caught error deleting a cart item.', err);
  }
});

module.exports = router;