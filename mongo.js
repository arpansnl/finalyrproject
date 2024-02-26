const { Decimal128 } = require('bson');
const { time } = require('console');
const mongoose=require('mongoose');
const { float } = require('webidl-conversions');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://0.0.0.0:27017/gasSensor")

.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('error');
})
const Schema=new mongoose.Schema({
    time:{
        type:Date,
        require:true
    },
    mq2:{
        type:Decimal128,
        require:true
    },
    mq7:{
        type:Decimal128,
        require:true

    },
    mq135:{
        type:Decimal128,
        require:true

    },
    dust:{
        type:Decimal128,
        require:true

    }
})
const collection=new mongoose.model('gas sensors',Schema);

