const {Router}=require("express");
const {showHomepage}=require("../controller/user")


const router=Router();

router.get("/",showHomepage)

module.exports=router;