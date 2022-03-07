var data =[{item : 'get milk'},{item : 'walk dog'},{item : 'kick some coding ass'}];
module.exports=function(app){
    app.get('/todo',(req,res)=>{
        res.render('todo',{todos:data});
    });
}