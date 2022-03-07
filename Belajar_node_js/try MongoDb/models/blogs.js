const mongoose=require('mongoose');
const schema = mongoose.schema;

const blogSchema=new schema({
    tittle : {
        type : string,
        required : true
    },
    snippet : {
        type : string,
        required : true
    },
    body : {
       type : string,
       rquired : true 
    }

},{timestamps:true});

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;
