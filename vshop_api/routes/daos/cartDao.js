const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const assert = require('assert');
const Promise = require('promise');

const envs = require('../../enviroments/envs');


const url = envs.getSelEnv().env.DBSettings.mongodburl;
const dbName = envs.getSelEnv().env.DBSettings.dbName;
const cartCollection = envs.getSelEnv().env.DBSettings.cartCol;
const connectParser = { useNewUrlParser: true };

//DAO methods
const findCart = function(db, callback, params) {

    let query = {};

    const collection = db.collection(cartCollection);
    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const insertItems = function(db, callback, itemsArray) {

    const collection = db.collection(cartCollection);

    collection.insertMany(itemsArray, function(err, result) {
        assert.equal(null, err);
        callback(result);
    });
}

const editItem = function(db, callback, itemData, id) {

    const collection = db.collection(cartCollection);
    let o_id = new mongo.ObjectID(id);

    collection.updateOne({ '_id' : o_id }, { $set: itemData }, function(err, result) {
        assert.equal(null, err);
        callback(result);
    });
}

const removeItem = function(db, callback,  id) {

    const collection = db.collection(cartCollection);
    let o_id = new mongo.ObjectID(id);

    collection.deleteOne({ '_id' : o_id }, function(err, result) {
        assert.equal(null, err);
        callback(result);
    });
}

//DAO exports
exports.fetchCart = function (params) {
    
    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            findCart(db, function(docs) {
                resolve(docs);
                client.close();
            }, params);
        });
    });

};

exports.putItems = function (items) {

    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            insertItems(db, function(result) {
                resolve(result);
                client.close();
            }, items);
        });
    });

};

exports.editItem = function (itemData, itemId) {

    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            editItem(db, function(result) {
                resolve(result);
                client.close();
            }, itemData, itemId);
        });
    });

};

exports.deleteItem = function (itemId) {

    return new Promise(function(resolve,reject) {
        
        MongoClient.connect(url, connectParser, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            
            removeItem(db, function(result) {
                resolve(result);
                client.close();
            }, itemId);
        });
    });

};
