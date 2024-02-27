var express = require('express');
var bodyParser = require('body-parser');
const SECRET_KEY = "Arpan";
//const console=require('console')
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
const port=process.env.PORT||3000;
const path=require("path");
const fs=require("fs");
const { error } = require('console');
const sensors=require('./sensordata');
const { Timestamp } = require('mongodb');
const { hostname } = require('os');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
express = require('express'),
app = express()
http = require('http'),
io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});
app.use(express.json());
app.post("/", (req,res)=>{
    console.log(req);     
    })
    
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static('index'));
app.set("view engine", "ejs");
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
        MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true})
        .then((db,err)=>{
         console.log("1");
            if (err) throw err;
        var dbo = db.db("gasSensor");
        dbo.collection("gas sensors").insertOne(info, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        })
    })
        resp.send({ "Status": 200 });
        console.log(info);
    } else {
        resp.status(401);
        resp.send({ "Erro": "Senha Incorreta" });
    }
    
};
app.post('/send',postDados);
    
    // req.setHeader('content-type','text/plain');
    // req.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    // req.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');


function DeleteDados(req, resp) {
    dados = [];
    resp.send("");
};

app.listen(10000);


app.get("/", GetDados);

app.delete("/Deletar", DeleteDados);
server.listen(port, ()=>{
console.log('started on port ${port}');
})