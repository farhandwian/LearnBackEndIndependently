let express=require('express');
let app=express();

let todocontroller=require('./controllers/todocontroller.js');

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//listening to port 3000
app.listen(3000);
console.log('you are listening to port number 3000');

//fire controllers
todocontroller(app);


