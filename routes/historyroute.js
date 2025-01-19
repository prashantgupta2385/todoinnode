const {Router}=require("express");
const {handleShowUserHistory}=require("../controller/history")


const router=Router();

router.get("/",handleShowUserHistory)
module.exports=router;