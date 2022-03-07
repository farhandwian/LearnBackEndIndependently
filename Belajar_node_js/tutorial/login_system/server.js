const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const router = require('./router');
const {v4 : uuidv4} = require("uuid");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

app.use(session({
    secret : uuidv4(),
    resave : false,
    saveUninitialized :true
}))

//load static assets
//app.use('/css', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'public/assets')))

//home route
app.use('/route',router);

app.get('/',(req,res)=>{
    res.render('base',{title : "Login System"});
});

app.listen(port,()=>{
    console.log("listening to the server on http://localhost:3000")
});