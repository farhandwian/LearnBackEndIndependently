require('dotenv').config()
const express=require('express')
const app=express();
const jwt = require('jsonwebtoken')

//Supaya app bisa ngeakses json/JWT
app.use(express.json())

let refreshTokens = []

app.post('/token',(req,res)=>{
   const refreshToken = req.body.token
   if(refreshToken == null)res.sendStatus(401)
   if(!refreshTokens.includes(refreshToken))res.sendStatus(403)
   jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err)res.sendStatus(403)
    const accesToken=generateAccesToken({name : user.name})
    res.json({accesToken}) 
   }) 
})

app.delete('/logout',(req,res)=>{
    refreshTokens=refreshTokens.filter(token=>token!==req.body.token)
    res.sendStatus(204)
})


//Create token
app.post('/login',(req,res)=>{
    //Authenticate User

    const username=req.body.username
    const user = {name:username}

  const accesToken = /*jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)*/generateAccesToken(user)
  const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({accesToken,refreshToken})
})

function generateAccesToken(user){
   return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15s"}) 
}

app.listen(4000,()=>console.log("server running on port 4000"))