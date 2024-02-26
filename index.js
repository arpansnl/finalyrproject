const express=require('express');
const app=express();
app.use(express.json());
const PORT=process.env.PORT||10000;
const path=require("path");
const fs=require("fs");
const DB_PATH=path.resolve("db.json");
const dbConnect=require('./mongodb');
const mongo=require("./mongo");
const { Collection } = require('mongoose');
const http = require('http');

const postData = JSON.stringify({
  'mq2': '1',
  'mq7':'2',
  'mq135':'3',
  'dust':'4'
});

const options = {
  hostname: 'https://35.160.120.126'||
  
  port: 10000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};
var request = require('request');

const req = http.createServer(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
});
const req1=http.request(options,(res)=>{
    req1.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      req1.write(postData);
      req1.end();
})
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
