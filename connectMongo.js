const mongoose=require('mongoose')
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECT_URI);
        console.log("MONGO DB CONNECTED");
    }
    catch{
        console.log("error");
    }
}
module.exports=connectDB;