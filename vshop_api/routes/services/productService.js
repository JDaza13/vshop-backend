const Promise = require('promise');
const ProductDao = require('../daos/productDao');

//Service methods

const filterProducts = function(params){

    return ProductDao.fetchProducts(params);
}

//Service exports

exports.getProducts = function (params) {
    
    return filterProducts(Number(params));
};
