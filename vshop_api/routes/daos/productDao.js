const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const assert = require('assert');
const Promise = require('promise');

const envs = require('../../enviroments/envs');


const url = envs.getSelEnv().env.DBSettings.mongodburl;
const dbName = envs.getSelEnv().env.DBSettings.dbName;
const productsCollection = envs.getSelEnv().env.DBSettings.productsCol;
const connectParser = { useNewUrlParser: true };

//DAO methods
const findProducts = function(db, callback, params, dbQuery) {

    let query = {};
    
    /* by category id */
    if(Array.isArray(params)){
        query['_id'] = { $in : params };
    }
    else{
       query.sublevel_id = params;
    }

    /* by availables */
    let availables = [];

    if(dbQuery.ava){
        availables.push(true);
    }
    if(dbQuery.avna){
        availables.push(false);
    }
    query.available = { $in : availables }
    
    /* by price*/
    if(dbQuery.prmin >= 0 && dbQuery.prmax >= 0){
        query.price =  {
            '$gte': dbQuery.prmin,
            '$lte': dbQuery.prmax
        }
    }
    
    /* by quantity*/
    if(dbQuery.stmin >= 0 && dbQuery.stmax >= 0){
        query.quantity =  {
            '$gte': dbQuery.stmin,
            '$lte': dbQuery.stmax
        }
    }
    
    /* sort operations */
    let sort = {
        'available': dbQuery.avsrt,
        'price': dbQuery.prsrt,
        'quantity': dbQuery.stsrt
    };
    
    console.log('dbQuery about to make consult...');
    console.log(query);

    const collection = db.collection(productsCollection);
    collection.find(query).sort(sort).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

//DAO exports
exports.fetchProducts = function (params, dbQuery) {

    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            findProducts(db, function(docs) {
                resolve(docs);
                client.close();
            }, params, dbQuery);
        });
    });

};
