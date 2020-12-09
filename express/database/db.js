const { mongodb } = require('mongodb');
const dbName = 'Games_Database';
const url = 'mongodb://test_mongo:27017';
const mongoOptions = { useNewUrlParser: true };

const state = {
    db: null
};

const connect = (cb) => {
    if (state.db){
        cb();
    } else {
        mongodb.MongoClient.connect( url, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbName);
                cb();
            }
        })
    }
}

const getDB = () => state.db;