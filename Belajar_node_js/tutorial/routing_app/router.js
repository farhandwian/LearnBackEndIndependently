const e = require("express");
const express = require("express");
const route = express.Router();
let accounts = require("./database");

//GET request
route.get('/accounts',(req,res)=>{
    res.json({userData:accounts});
});

//POST request
route.post('/accounts',(req,res)=>{
    const incomingAccount = req.body;
    accounts.push(incomingAccount);
    res.json(accounts);
});

//Route params
route.get('/accounts/:id',(req,res)=>{
    const accountid=Number(req.params.id);
    const getAccount=accounts.find((acc)=>acc.id===accountid);
    if(!getAccount){
        res.status(500).send("Account not found");
    }else{
        res.json({userData:[getAccount]});
    }
});

//PUT request
route.put('/accounts/:id',(req,res)=>{
    const accountid=Number(req.params.id);
    const body = req.body;
    const account=accounts.find((acc)=>acc.id===accountid);
    const index=accounts.indexOf(account);

     if(!account){
         res.status(500).send("Account not Found");
     }else{   
        const updateAccount={...account,...body};
        accounts[index]=updateAccount;
        res.send(updateAccount);
     }
});

//DELETE request
route.delete('/accounts/:id',(req,res)=>{
    const accountid=Number(req.params.id);
    const newAccount=accounts.filter((acc)=>{acc.id!=accountid});
    if(!newAccount){
        res.status(500).send("Account not found");
    }else{
        accounts=newAccount;
        res.send(accounts);
    }
});

module.exports=route;