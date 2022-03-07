var express = require('express');
var router = express.Router();

const credential ={
    email : "dwyanfarhan@gmail.com",
    password : "yoontae93"
}

router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful..!");
    }else{
        res.end("invalid ussername");
    }
});

router.get('/dashboard',(req,res)=>{
   if(req.session.user) {
    res.render('dashboard',{user:req.session.user});
   }else{
    res.send("unauthorize user")
   }
});

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send("Error"); 
         }else{
             res.render("base",{title:"Express",logout:"logout successful"});
         }
    });    
});

module.exports=router;

