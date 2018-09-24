const Promise = require('promise');
const ProductDao = require('../daos/productDao');

//Service methods

const filterProducts = function(params, query){
    
    let dbQuery = {
        ava: query.ava == 'true' ? true : false,
        avna: query.avna == 'true' ? true : false,
        avsrt: query.avsrt ? Number(query.avsrt) : -1,
        prmin: query.prmin ? Number(query.prmin) : null,
        prmax: query.prmax ? Number(query.prmax) : null,
        prsrt: query.prsrt ? Number(query.prsrt) : -1,
        stmin: query.stmin ? Number(query.stmin) : null,
        stmax: query.stmax ? Number(query.stmax) : null,
        stsrt: query.stsrt ? Number(query.stsrt) : -1
    };

    return ProductDao.fetchProducts(params, dbQuery);
}

//Service exports

exports.getProducts = function (params, query) {
    
    return filterProducts(Number(params), query);
};
