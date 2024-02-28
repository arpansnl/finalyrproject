import express from 'express';
import { createServer } from "https";
//  const {express}=express;


const SECRET_KEY = "Arpan";
//const console=require('console')
import pkg4 from 'https';
import pkg3 from 'mongodb';
import pkg5 from './connectMongo.js';
const x=pkg.con;
// app.use(express.json());
const { MongoClient } = pkg3;
const https=pkg4;
const connectDB=pkg5;
//const connectDB = require("./connectMongo");

const client = new MongoClient('mongodb+srv://arpansnl01:Arpansnl@cluster0.oibycgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
connectDB();
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


import pkg6 from './mongo.js';
const sensors=pkg6;
//const server1=require('./server.js');
const { Timestamp } = pkg3;

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017";

//app = express().use(express.static(__dirname + '/')),
//http = require('http').Server(app),
//io = require('socket.io')(http);
//app.listen(8000);
//app.get('/', function(req, res){
//    res.sendFile(__dirname + '/index.html');
//});

// io.on('connection', function(socket){
//     console.log('a user connected');
// });
// app.use(express.json());
// app.post("/", (req,res)=>{
//     console.log(req);
//     });
import pkg from "body-parser";
import { readFileSync } from "fs";


 
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { urlencoded, json } = pkg;
const server = express();
server.use(urlencoded({ extended: false }));
server.urlencoded;
server.json;
 
const options = {
   key: readFileSync("server.key"),
   cert: readFileSync("server.cert"),
};

server.get("/", function (req, res) {
   res.sendFile("index.html",{root: __dirname})
});

createServer(options, server).listen(3001, function (req, res) {
   console.log("Server started at port 3001");
});


server.use('/', express.static('index'));
server.set("view engine", "ejs");
var dados = [];
var info;
//const { Parser }= require ("simple-text-parser");
 
// const parser = new Parser();
// server.use(parser);
// // const x=require('simple-text-parser')
// // server.use(x.new Parser());
console.log("1");
function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    resp.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    
    resp.send(dados);
};
function postDados(req,resp){
    
    if (req.query.admin == SECRET_KEY) {
        info = {"time:":Date(), "mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust2": req.query.dust2 };
        col.insertOne(info);
        resp.send({ "Status": 200 });
        console.log(info);
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




server.get("/", GetDados);

server.delete("/Deletar", DeleteDados);
