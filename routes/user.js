const {Router}=require("express");
const {handleSignUp,showHandleSignUp,showHandleLogin,handleLogin}=require("../controller/user")

const router=Router();
router.post("/signup",handleSignUp);
router.post("/login",handleLogin);
// user ke static routes
router.get("/signup",showHandleSignUp);
router.get("/login",showHandleLogin);

module.exports=router;