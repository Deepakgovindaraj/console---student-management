const mongodb = require('mongodb')
const mongoclient = mongodb.MongoClient;

async function getDB(){
    const client = await mongoclient.connect('mongodb://127.0.0.1:27017/');
    const db = client.db('classroom');
    if(!db){
        console.log('failed to connect database');
    }
    return db;
}
module.exports = {getDB};