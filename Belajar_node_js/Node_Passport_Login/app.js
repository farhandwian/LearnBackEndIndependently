const express = require('express')
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const flash = require('connect-flash');
const session = require('express-session')
const passport=require('passport')
const app = express()

//DB Config
const db=require('./config/keys').MongoURI

//Passport Config
require('./config/passport')(passport);

//Connect to db
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>console.log('mongoDB connected bro'))
    .catch(err=>console.log(err))

//Body Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash())

//Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error=req.flash('error')
    next(); 
});

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server started on port ${PORT}`))

//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))