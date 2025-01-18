const {Router}=require("express");
const {handleAddComment,handleUpdateComment,handleDeleteComment,showHandleUpdateComment}=require("../controller/comment")
const router=Router();

router.post("/:id",handleAddComment)
router.post("/update/:id",handleUpdateComment)
router.get("/delete/:id",handleDeleteComment)
router.get("/edit/:id",showHandleUpdateComment)
module.exports=router;