const express=require('express');
const app=express();
app.use(express.json());
const PORT=process.env.PORT||4000;
const path=require("path");
const fs=require("fs");
const DB_PATH=path.resolve("db.json");
const dbConnect=require('./mongodb');
const mongo=require("./mongo");
const { Collection } = require('mongoose');

const main= async()=>{
let data=await dbConnect();
data= await data.find().toArray();
console.log(data);
}
app.use(express.json());
app.get("/",async(req,res)=>{
    fs.readFile(DB_PATH,"utf-8",(err,jsonString)=>{
        if(err)return console.log("error in reading from db");
        let values=JSON.parse(jsonString);
        res.status(200).json({
            totalValues:values.length,
            values,
        });
    });
});
app.post("/",async (req,res)=>{
        const data=new Collection({
            time:new Date(),
            mq2:req.body.mq2,
            mq7:req.body.mq7,
            mq135:req.body.mq135,
            dust:req.body.dust
        });
        const val= await data.save();
        res.json(val);
        
        
    });
app.listen(PORT,()=> console.log("listening to port:",PORT));
