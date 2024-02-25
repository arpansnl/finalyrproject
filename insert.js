const dbConnect=require('./mongodb');
const insertData=async ()=>{
    console.log("called ");
    let data=await dbConnect();
    console.log(data);
}
insertData();