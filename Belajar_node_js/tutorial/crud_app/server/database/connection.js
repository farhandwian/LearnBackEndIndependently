const mongoose=require('mongoose');
const MONGO_URL="mongodb+srv://farhan_dwian:yoontae93@cluster0.ssmnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB=async()=>{
    try{
       const con=await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
       })
     console.log(`MongoDB connected to : ${con.connection.host}`);   
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB;