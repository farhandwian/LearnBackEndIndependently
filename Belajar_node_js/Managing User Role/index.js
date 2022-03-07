const express=require('express');
const app=express();
const {authCourse,authPage} = require('./middleware')

app.use(express.json())

app.get("/course/grades",authPage(["teacher","admin"]),(req,res)=>{
    res.json({
        "pedro":100,
        "paulo":80,
        "farhan":85
    })
})

app.get("/course/:number",authCourse,(req,res)=>{
   const courseNumber=req.params.number;
   res.json(`YOU HAVE PERMISSION TO SEE COURSE ${courseNumber}`); 
})

app.listen(3001,()=>{
   console.log("SERVER IS RUNNING ON PORT 3001"); 
})