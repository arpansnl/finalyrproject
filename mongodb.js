var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const client=new MongoClient(url);
const database="gasSensor";
async function dbConnect(){
    let result=client.connect();
    db=(await result).db;
    collection=db.collection('gas sensors');
    return db.collection('gas sensors');
    // let data= await collection.find({}).toArray();
    // console.log(data);
};
module.exports=dbConnect;