const express=require('express');
const controller=require('../controller/controller')
const route=express.Router();

const render=require('../services/render');

route.get('/',render.homeRoutes);

route.get('/add_user',render.addUser);

route.get('/update_user',render.update_user);

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);


module.exports=route;

