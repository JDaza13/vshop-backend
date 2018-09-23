const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const assert = require('assert');
const Promise = require('promise');

const envs = require('../../enviroments/envs');


const url = envs.getSelEnv().env.DBSettings.mongodburl;
const dbName = envs.getSelEnv().env.DBSettings.dbName;
const categoriesCollection = envs.getSelEnv().env.DBSettings.categoriesCol;
const connectParser = { useNewUrlParser: true };

//DAO methods
const findCategories = function(db, callback, params) {

    let query = {};

    const collection = db.collection(categoriesCollection);
    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

//DAO exports
exports.fetchCategories = function (params) {
    
    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            findCategories(db, function(docs) {
                resolve(docs);
                client.close();
            }, params);
        });
    });

};
