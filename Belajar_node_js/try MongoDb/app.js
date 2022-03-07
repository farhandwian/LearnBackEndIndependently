const mongoose=require('mongoose');
const express=require('express');
const Blog = require('./models/blogs');

const app = express();

const dbURI='mongodb+srv://netninja:test1234@cluster0.d6txh.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then((result)=>app.listen(3000))
        .catch((err)=>console.log(err));


app.get('/add-blog',(req,res)=>{
    const blog= new Blog({
        title : 'new blog',
        snippet : 'about my new blog',
        bofy : 'more aboy my new blog'
    });

    blog.save()
        .then((result)=>{res.send(result)})
            .catch((err)=>{console.log(err)})
})



