const {Router}=require("express");
const {handleSignUp,showHandleSignUp,showHandleLogin,handleLogin,handleLogout}=require("../controller/user")

const router=Router();
router.post("/signup",handleSignUp);
router.post("/login",handleLogin);
// user ke static routes
router.get("/signup",showHandleSignUp);
router.get("/login",showHandleLogin);
router.get("/logout",handleLogout);

module.exports=router;