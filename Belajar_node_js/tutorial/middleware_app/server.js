const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

app.use((req,res,next)=>{
    console.log("Request data" + new Date());
    next();
});

app.use((req,res,next)=>{
    var filePath = path.join(__dirname,'static',req.url);
    fs.stat(filePath,(err,fileinfo)=>{
        if(err){
            next();
            return;
        }
        if(fileinfo.isFile()){
            res.sendFile(filePath);
        }else{
            next();
        }

    })
});

app.use((req,res)=>{
    res.status(404);
    res.send("File Not Found");
});

