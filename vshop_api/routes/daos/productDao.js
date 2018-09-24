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
const findProducts = function(db, callback, params) {

    let query = {};
    
    if(Array.isArray(params)){
        query['_id'] = { $in : params };
    }
    else{
       query.sublevel_id = params;
    }

    const collection = db.collection(productsCollection);
    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

//DAO exports
exports.fetchProducts = function (params) {

    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            findProducts(db, function(docs) {
                resolve(docs);
                client.close();
            }, params);
        });
    });

};
