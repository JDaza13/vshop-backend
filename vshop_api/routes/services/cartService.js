const Promise = require('promise');
const CartDao = require('../daos/cartDao');
const ProductDao = require('../daos/productDao');
const mongo = require('mongodb');

//Service methods
const filterCart = function(){
    
    return new Promise(function(resolve,reject) {
    
        let cartItemsResult = CartDao.fetchCart();
        
        cartItemsResult
        .then(function(data){
            
            let itemsIds = data.map(function(obj){ 
               return new mongo.ObjectID(obj.item_id);
            });
    
            let cartResult = ProductDao.fetchProducts(itemsIds);
            
            cartResult
            .then(function(data){
                resolve(data);
            })
            .catch(function(err){
                console.log('Caught error fetching cart items.', err);
            });
    
        })
        .catch(function(err){
            console.log('Caught error fetching cart base items.', err);
        });
    });
}

const insertItems = function(items){

    return CartDao.putItems(items);
}

const editItem = function(itemData, itemId){

    return CartDao.editItem(itemData, itemId);
}

const removeItem = function(itemId){

    return CartDao.deleteItem(itemId);
}

//Service exports

exports.getCart = function () {
    
    return filterCart();
};

exports.putItems = function (items) {
    
    return insertItems(items);
};

exports.updateItem = function (itemData, itemId) {
    
    return editItem(itemData, itemId);
};

exports.deleteItem = function (itemId) {
    
    return removeItem(itemId);
};