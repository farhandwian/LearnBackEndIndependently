const authPage=(permissions)=>{
    return (req,res,next)=>{
        const userRole = req.body.role;
        if(permissions.include(userRole)){
            next();
        }else{
            return res.status(401).json("You dont have permissions!");
        }        
    }
}

const authCourse = (req,res,next)=>{
    const courseNumber=req.params.number;
    if(req.body.course.include(courseNumber)){
        next()
    }else{
        return res.status(401).json("You dont have access to this course");
    }
}

module.exports ={authPage,authCourse};
