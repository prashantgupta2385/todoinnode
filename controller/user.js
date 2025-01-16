 const User=require("../models/user")
 
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
    const user=await User.matchPassword(email,password);
    console.log("User",user);
    return res.redirect("/");
    
}

function showHandleSignUp(req,res) {
    return res.render("signup")
}
function showHandleLogin(req,res) {
    return res.render("login")
}
 function showHomepage(req,res) {
    return res.render("home")
}
module.exports={
    handleSignUp,
    showHandleSignUp,showHomepage,showHandleLogin,handleLogin
    
}