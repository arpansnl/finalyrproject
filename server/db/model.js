import pkg6 from 'mongoose';
const mongoose=pkg6;
import pk10 from 'dotenv';
const dotenv=pk10;
pk10.config();
import {MongoClient} from "mongodb";
const connectionString= process.env.MONGO_CLIENT_URI||"";
let conn;
const client=mnew MongoClient(connectionString)
try{
    conn= client.connect();
}
catch(e){
    console.log(e);
}
let db=conn.db("gasSensor");

export default db;