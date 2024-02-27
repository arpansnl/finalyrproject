const PORT=process.env.PORT||10000;
const path=require("path");
const fs=require("fs");
const { error } = require('console');
const sensors=require('./models/sensordata');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
express = require('express'),
app = express().use(express.static(__dirname + '/')),
http = require('http').Server(app),
io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});
app.use(express.json());
// const postData = JSON.stringify({
//   'mq2': '1',
//   'mq7':'2',
//   'mq135':'3',
//   'dust':'4'
// });


// var request = require('request');

// const req = http.createServer(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('No more data in response.');
//   });
//   req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
//   });
// });
// const req1=http.request(options,(res)=>{
//     req1.on('error', (e) => {
//         console.error(`problem with request: ${e.message}`);
//       });
//       req1.write(postData);
//       req1.end();
// })
var logger=require('logger');
app.post("/", (req,res)=>{
    console.log(req);
         
         MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true})
        .then((db,err)=>{
         console.log("1");
            if (err) throw err;
        var dbo = db.db("gasSensor");
        dbo.collection("gas sensors").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        })
    })
    .catch((err)=>{
        console.log(err);
    })
    })
    
app.listen(PORT,()=> console.log("Client listening to port:",PORT));
var bodyParser = require('body-parser');
const SECRET_KEY = "Arpan";
const { response } = require('express');
const { json } = require("http-client");
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
server.use('/', express.static('Arquivos'));
server.set("view engine", "ejs");
var dados = [];
var info;

function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(dados);
};

// create application/x-www-form-urlencoded parser









// server.post('/send', urlencodedParser, function (req, res) {
    
//     fetch('http://192.168.31.58:8000/send', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: JSON.stringify({})
// })
// console.log(req.body);
//   })
function PostDados(req, resp) {
    console.log(req);
    if (req.query.admin == "Arpan") {
        info = { "mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust": req.query.dust };
        
        resp.send({ "Status": 200 });
    } else {
        resp.status(401);
        resp.send({ "Erro": "Senha Incorreta" });
    }
    console.log(info);
};


 function DeleteDados(req, resp) {
     dados = [];
     resp.send("");
 };
 function Index(req, resp) {
     resp.render("index");
 };

server.get("/", Index);
server.get("/Receber", GetDados);
server.post("/send", PostDados);
server.delete("/Deletar", DeleteDados);
server.listen(8000,()=>console.log("Server listening to port 8000"));


