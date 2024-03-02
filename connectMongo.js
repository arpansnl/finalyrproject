import pkg6 from 'mongoose';
const mongoose=pkg6;
import pk10 from 'dotenv';
const dotenv=pk10;
pk10.config();
const connectDB= ()=>{
    try{
        mongoose.connect(process.env.uri);
        console.log("MONGO DB CONNECTED");
    }
    catch{
        console.log("error");
    }
}

export default connectDB;