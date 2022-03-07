const userDB = require('../model/model');

//create new user

exports.create =(req,res)=>{
    //validate request
    if(!req.body){
       res.status(400).send({message:"content cannot be empty"});
       return; 
    }
    //new user
    const user = new userDB({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status: req.body.status            
    });
    //save user in database
    user
        .save(user)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
               message : err.message || "Some error occured while creating a create  operation" 
            })
        });            
}

//Find
exports.find=(req,res)=>{
    userDB.find()
    .then(user=>res.send(user))
    .catch(err=>res.status(500).send({message:err.message||"Error occured while retriving user information"}))
    
}

//Update a new identified user
exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"content cannot be empty"});
        return; 
    }
    const userID=req.params.id;
    userDB.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(data=>{
       if(!data){   
           res.status(404).send({message:`Cannot update user with ${id} Maybe user not found`});
       }else{
            res.send(data);
       }        
    })
    .catch(err=>{
        res.status(500).send({message:"Error update user information"})
    })
}

//Delete a user with specified id in data base
exports.delete=(req,res)=>{
    const userID=req.params.id;

    userDB.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with id ${id},maybe id is wrong`});
            }else{
                res.send({message:"User was deleted succesfully!"})
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Could not delete user with that id"})
        })

}