const {Router}=require("express");
const {showAddBlogPage,handleAddBlogPage,handleSingleView}=require("../controller/blog")

const multer=require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      const filename=`${Date.now()}-${file.originalname}`
      cb(null, filename)
    }
  })
  
const upload = multer({ storage: storage })
const router=Router();
router.get("/get-blog/:id",handleSingleView)


router.get("/add-new",showAddBlogPage)
router.post("/add-new",upload.single('coverImage'),handleAddBlogPage)
module.exports=router;