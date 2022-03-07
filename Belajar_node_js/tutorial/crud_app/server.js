const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require("body-parser");
const path=require('path');
const connectDB=require('./server/database/connection');

const app = express();

dotenv.config({path : 'config.env'})
const PORT=process.env.PORT || 3000;

//log request
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//set view engine
app.set("view engine","ejs");

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));

//load routers
app.use('/',require('./server/routes/router')); 

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});
