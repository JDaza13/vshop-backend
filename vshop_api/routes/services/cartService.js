const CartDao = require('../daos/cartDao');

//Service methods
const filterCart = function(){
    
    return CartDao.fetchCart();
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