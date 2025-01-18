 const User=require("../models/user")
 const Blog=require("../models/blog")
 async function handleSignUp(req,res){
    const {fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
}
async function handleLogin(req,res){
    const {email,password}=req.body;
    try {
        const token=await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token',token).redirect("/");

    } catch (error) {
        return res.render("login",{
            error:"Incorrect Email or Password"
        })
    }
    // const token=await User.matchPasswordAndGenerateToken(email,password);
   
    // return res.cookie('token',token).redirect("/");
    
}

function showHandleSignUp(req,res) {
    return res.render("signup")
}
function showHandleLogin(req,res) {
    return res.render("login")
}
 async function showHomepage(req,res) {
    const allBlogs=await Blog.find({});
    
    return res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
}
function handleLogout(req,res) {
    res.clearCookie("token").redirect("/")
    
}
module.exports={
    handleSignUp,handleLogout,
    showHandleSignUp,showHomepage,showHandleLogin,handleLogin
    
}