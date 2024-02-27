const express=require('express');
const app=express();
const { hostname } = require('os');
const port=process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`listening on ${process.env.PORT || 5000}`);
});
app.get('/',async(req,res)=>{
    res.send("<h1>hello World!</h1>")
})