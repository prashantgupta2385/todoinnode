const Blog=require("../models/blog")
const Comment=require("../models/comments")
  
function showAddBlogPage(req,res){
    return res.render("addBlog")
}
async function handleAddBlogPage(req,res){
    const {title,body}=req.body;
    const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/upload/${req.file.filename}`
    })
    return res.redirect(`/blog/get-blog/${blog._id}`)
}
async function handleSingleView(req,res){
    const id=req.params.id;
    const blog=await Blog.findById(id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy")
    

    return res.render("blog",{
        user:req.user,
        blog,
        comments
    });
} 
async function handleDeleteBlog(req,res){
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    // Step 1: Remove the blog (pre-remove will handle comments and history)
    await blog.deleteOne();

    res.status(200).redirect("/")
}

module.exports={
    showAddBlogPage,handleAddBlogPage,handleSingleView,handleDeleteBlog
}