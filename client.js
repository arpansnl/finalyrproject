// import pkg11 from 'dns';
// import pk10 from 'dotenv';
// import express from 'express';
// import pkg4 from 'https';
// import pkg3 from 'mongodb';
// import pkg13 from 'tls';
// import pkg5 from './connectMongo.js';
// import pkg6 from './mongo.js';
// const tls=pkg13;
// const dns=pkg11;  
// const SECRET_KEY = "Arpan";
// const x=pkg.con;
// const { MongoClient } = pkg3;
// const https=pkg4;
// const connectDB=pkg5;
// const mongoclient = new MongoClient(process.env.MONGO_CONNECT_URI);
// // const { response } = require('express');
// // const { type } = require('server/reply');
// const db = mongoclient.db("test");
// const collect = db.collection("gas sensors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// // app.use(express.json());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());


// const sensors=pkg6;
// //const server1=require('./server.js');
// const { Timestamp } = pkg3;
// pk10.config();
// // dns.lookup("finalyearproject-5iva.onrender.com",console.log);
// import pkg from "body-parser";
// import { readFileSync } from "fs";





// var options = {
//     key: readFileSync("./key.pem"),
//     cert: readFileSync("./cert.pem"),
//     MONGO_CONNECT_URI:"mongodb+srv://arpansnl01:Arpansnl@cluster0.oibycgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//  };
// //  const httpServer=https.createServer((req, res) => {
// //     res.writeHead(200, { 'Content-Type': 'text/plain' });
// //     res.end('okay');
// //  });


// //httpServer.listen(process.env.PORT,"finalyearproject.onrender.com",console.log("yes"));

// //(req,res)=>{
// //      console.log("2");
// //  console.log("server created on 3001");
// //  });
// //server.use(urlencoded({ extended: false }));
// // httpServer.urlencoded;
// // httpServer.json;

// // httpServer.listen(3001,"https://finalyrproject-r935yghii-arpansnls-projects.vercel.app");
// // var reqPost=httpServer.listen(optionsget, function(req,res)
// // {
// //     httpServer.on(Http2ServerRequest,(res)=>{console.log(res);
// //         res.sendFile("index.html",{root: __dirname})});
// //     //console.log('status code:'+res.);
// // })

// // //server.post("/send",postDados);


// // // httpServer.listen("/", function (req, res) {
// // //    res.sendFile("index.html",{root: __dirname})
// // // });

// // server.use('/', express.static('index'));
// // server.set("view engine", "ejs");
// // var dados = [];
// // var info;
// // //const { Parser }= require ("simple-text-parser");
 
// // //const parser = new Parser();
// // //server.use(parser);

// // console.log("1");
// // function GetDados(req, resp) {
// //     resp.setHeader("Access-Control-Allow-Origin", "*");
// //     resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
// //     resp.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    
// //     resp.send(dados);
// // };
// function postDados(req){
// console.log(2);
//     if (req.query.admin == SECRET_KEY) {
//         info = {"mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust2": req.query.dust2 };
//         col.insertOne(info);
//         resp.send({ "Status": 200 });
//         console.log(req);
//     }
//        else{
//         console.log("error");
//         // .then((db,err)=>{
//         //  console.log("1");
//         //     if (err) throw err;
//         // var dbo = db.db("gasSensor");
//         // dbo.collection("gas sensors").insertOne(info, function(err, res) {
//         //     if (err) throw err;
//         //     console.log("1 document inserted");
//         //     db.close();
//         resp.status(401);
//         resp.send({ "Error": "Admin incorrect" });
//        }
//     }
    

// // server.post('/send',postDados);
    
// //     //req.setHeader('content-type','text/plain');
// //     // req.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
// //     // req.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');


// // function DeleteDados(req, resp) {
// //     dados = [];
// //     resp.send("");
// // };
// // server.listen(3002,"120.0.0.7",options);



// const server = https.createServer(options,(req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   console.log('Hello World');
//   res.end();
// });
// server.listen(3000,"0.0.0.0",serverfunction);

// const optionsget = {
    
//     port: process.env.PORT,
//     path: '/',
//     method: 'GET',
//     Protocol  : 'TLSv1.3',
//     Ciphers: 'ALL',
//     minVersion: "TLSv1.3",
//      Cert: readFileSync("./clientcert.pem"),
//      Key: readFileSync("./clientcert.key")
//   };
//   const optionspost={
//     hostname: '0.0.0.0',
//     port: process.env.PORT,
//     path: '/',
//     method: 'POST',
//     Protocol  : 'TLSv1.3',
//     Ciphers: 'ALL',
//     minVersion: "TLSv1.3",
//      Cert: readFileSync("./clientcert.pem"),
//      Key: readFileSync("./clientcert.key"),
//   };
// //server.listen(3001, '', serverfunction());

//  function serverfunction(){
//     const address=server.address();
//   console.log(`Server listening on ${address.address}:${address.port}`);
//   console.log(tls.DEFAULT_MIN_VERSION);
//   server.on("connection",()=>{
//     console.log("server connected");
//   })
//  }
//   const client= express();
// //    client.listen(80,"",clientfunction);
// //    function clientfunction(){
// //   const clientReq = https.request(optionsget, (clientRes) => {
// //     let data = clientRes.data;
// //     clientRes.on('data', postDados(data));
    

// //     clientRes.on('end', () => {
// //       console.log('Response from server:', data);
// //     });
// //   });

// //   clientReq.on('error', (error) => {
// //     console.error('Error sending request:', error);
// //   });

// //   clientReq.end();

// //    }
const express = require('express');
const bodyParser = require('body-parser');
//const fetch = require('node-fetch');

const app = express();
const port = 4000;

// Parse JSON bodies
app.use(bodyParser.json());

// GET route to send data to server
app.get('/sendData', async (req, res) => {
  const dataToSend = { message: 'Hello from client!' };

  try {
    const response = await fetch('http://0.0.0.0:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    const responseData = await response.text();
    console.log('Response from server:', responseData);
    res.send('Data sent successfully');
  } catch (error) {
    console.error('Error sending data to server:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the client
app.listen(port, () => {
  console.log(`Client listening on port ${port}`);
});

