var express = require('express');
var bodyParser = require('body-parser');
const SECRET_KEY = "Arpan";
//const console=require('console')
require("dotenv").config();

// app.use(express.json());

const connectDB = require("./connectMongo");

connectDB();
const { response } = require('express');
const { type } = require('server/reply');
//var app = express().use(express.static(__dirname + '/'));
//var http = require('http').Server();
//var request = require('request');
//const { json } = require("http-client");
//const { hostname } = require('os');
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const PORT=process.env.PORT;



const sensors=require('./models/sensordata');
const server1=require('./server');
const { Timestamp } = require('mongodb');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017";
var express = require('express'),
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
    
server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
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
       try{
        info = {"time:":Date(), "mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust2": req.query.dust2 };
        const data= new sensors(info);
        
        const store=data.save();
        
        resp.send({ "Status": 200 });
        console.log(info);
       }
       catch(error){
        console.log("error");
        // MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true})
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
}
server.post('/send',postDados);
    
    // req.setHeader('content-type','text/plain');
    // req.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    // req.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');


function DeleteDados(req, resp) {
    dados = [];
    resp.send("");
};




server.get("/", GetDados);

server.delete("/Deletar", DeleteDados);
server.listen(PORT, ()=>{
    console.log("server is running on port="+PORT);
});