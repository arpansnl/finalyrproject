import * as socket from 'socket.io';
socket1=io('');
socket.on("connect",()=>{
    console.log("connected");
})
const bar1= document.getElementById("bar1");
const mq2=document.getElementById("mq2values");

