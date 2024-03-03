import pkg11 from 'dns';
import pk10 from 'dotenv';
import express from 'express';
import pkg4 from 'https';
import pkg3 from 'mongodb';
import pkg5 from './connectMongo.js';
import pkg6 from './mongo.js';
const dns=pkg11;  
const SECRET_KEY = "Arpan";
const x=pkg.con;
//const hostname = '<YOUR_IP>';
const { MongoClient } = pkg3;
const https=pkg4;
const connectDB=pkg5;
//const connectDB = require("./connectMongo");
const server=express();
const client = new MongoClient(process.env.MONGO_CONNECT_URI);
// const { response } = require('express');
// const { type } = require('server/reply');
const db = client.db("test");
const col = db.collection("gas sensors");
//var app = express().use(express.static(__dirname + '/'));
//var http = require('http').Server();
//var request = require('request');
//const { json } = require("http-client");
//const { hostname } = require('os');
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


const sensors=pkg6;
//const server1=require('./server.js');
const { Timestamp } = pkg3;
pk10.config();
// dns.lookup("finalyearproject-5iva.onrender.com",console.log);
import pkg from "body-parser";
import { error } from 'console';
import { readFileSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { request } from 'http';
import { Http2ServerRequest } from 'http2';

var optionsget = {
    host : "0.0.0.0",
    port: process.env.PORT || 3001,
    path : '/',
    method : 'GET',
    key: readFileSync("./key.pem"),
     cert: readFileSync("./cert.pem"),
    
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { urlencoded, json } = pkg;

var options = {
    key: readFileSync("./key.pem"),
    cert: readFileSync("./cert.pem"),
    MONGO_CONNECT_URI:"mongodb+srv://arpansnl01:Arpansnl@cluster0.oibycgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 };
 const httpServer=https.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
 });


//httpServer.listen(process.env.PORT,"finalyearproject.onrender.com",console.log("yes"));

//(req,res)=>{
//      console.log("2");
//  console.log("server created on 3001");
//  });
//server.use(urlencoded({ extended: false }));
httpServer.urlencoded;
httpServer.json;

httpServer.listen(3001,"0.0.0.0");
var reqGet=httpServer.listen(optionsget, function(req,res)
{
    httpServer.on(Http2ServerRequest,(res)=>{console.log(res)});
    //console.log('status code:'+res.);
})

server.post("/send",postDados);


server.get("/", function (req, res) {
   res.sendFile("index.html",{root: __dirname})
});

server.use('/', express.static('index'));
server.set("view engine", "ejs");
var dados = [];
var info;
//const { Parser }= require ("simple-text-parser");
 
//const parser = new Parser();
//server.use(parser);

console.log("1");
function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    resp.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    
    resp.send(dados);
};
function postDados(req,resp){
console.log(2);
    if (req.query.admin == SECRET_KEY) {
        info = {"mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust2": req.query.dust2 };
        col.insertOne(info);
        resp.send({ "Status": 200 });
        console.log(req);
    }
       else{
        console.log("error");
        // .then((db,err)=>{
        //  console.log("1");
        //     if (err) throw err;
        // var dbo = db.db("gasSensor");
        // dbo.collection("gas sensors").insertOne(info, function(err, res) {
        //     if (err) throw err;
        //     console.log("1 document inserted");
        //     db.close();
        resp.status(401);
        resp.send({ "Error": "Admin incorrect" });
       }
    }
    

server.post('/send',postDados);
    
    //req.setHeader('content-type','text/plain');
    // req.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    // req.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');


function DeleteDados(req, resp) {
    dados = [];
    resp.send("");
};
server.listen(3001,"127.0.0.1");






