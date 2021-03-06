const express = require('express');
const router =express.Router();
const {ensureAuth,ensureGuest}=require('../middleware/auth')
const Story = require('../models/story');
// @desc Login/Landing page
// @route GET/

router.get('/',ensureGuest,(req,res)=>{
    res.send('Login')
})

// @desc Dashboard
// @route GET /dashboard

router.get('/dashboard',ensureAuth,async(req,res)=>{
    try{
        const stories = await Story.find({user:req.user.id}).lean()
        res.sender('dashboard',{
            name : req.user.firstName,
            stories 
        })
    } catch(err){
        console.error(err)
        res.render('error/500')
    }

    
})

module.exports = router; 
