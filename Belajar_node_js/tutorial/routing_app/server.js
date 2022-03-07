const express = require('express');
const app = express();

const route = require('./router');
const bodyParser=require('body-parser');
const { urlencoded } = require('express');

app.use(bodyParser.urlencoded({extended:false}));

const port=3000;

app.use('/api',route);

//Home route
app.get('/',(req,res)=>{
    res.end("Routing App");
});

app.listen(port,()=>console.log(`Express Server currently running on http://localhost:${port}`));