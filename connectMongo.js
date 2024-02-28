import pkg6 from 'mongoose';
const mongoose=pkg6;
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECT_URI);
        console.log("MONGO DB CONNECTED");
    }
    catch{
        console.log("error");
    }
}

export default connectDB;