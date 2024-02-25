const express=require('express');
const app=express();
const PORT=process.env.PORT||8000;
const path=require("path");
const fs=require("fs");
const DB_PATH=path.resolve("db.json");
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
app.post("/",async(req,res)=>{
    fs.readFile(DB_PATH,"utf-8",(err,jsonString)=>{
        if(err)return console.log("error in reading from db");
        let body=req.body;
        let valuesArr=JSON.parse(jsonString);
        let obj={
            time:new Date(),
            mq2:body.mq2,
            mq7:body.mq7,
            mq135:body.mq135,
            dust:body.dust
        };
        valuesArr.push(obj);
        fs.readFile(DB_PATH,"utf-8",(err,jsonString)=>{
            if(err)return console.log("error in reading from db");
            res.status(200).json({
                message:"Values saved",
                value:valuesArr[valuesArr.length-1],
            });
        });
    });
});
app.listen(PORT,()=> console.log("listening to port:",PORT));
