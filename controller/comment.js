const Comment=require("../models/comments")


async function handleAddComment(req,res){
    const com=await Comment.create({
        content:req.body.content,
        blogId:req.params.id,
        createdBy:req.user._id
    })
    
    return res.redirect(`/blog/get-blog/${req.params.id}`);
    
} 

async function handleUpdateComment(req,res){
    
        const id = req.params.id; // ID of the comment to be edited
        const { content } = req.body; // New content
        const userId = req.user._id; // ID of the logged-in user (from middleware/auth)

        // Step 1: Find the comment
        const comment = await Comment.findById(id);

        

        // Step 2: Check if the logged-in user is the creator of the comment
        if (comment.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this comment" });
        }

        // Step 3: Update the comment's content
        comment.content = content;
        await comment.save();
        return res.status(200).redirect(`/blog/get-blog/${comment.blogId}`);


    
} ;

async function handleDeleteComment(req,res){
    
    const id=req.params.id;
    const userId = req.user._id;
    const comment = await Comment.findById(id);
    
   

    // Step 2: Check if the logged-in user is the creator of the comment
    if (comment.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }
    await comment.deleteOne();

    return res.status(200).redirect(`/blog/get-blog/${comment.blogId}`);

} 
function showHandleUpdateComment(req,res){
    return res.render("editcomment",{id:req.params.id})
}

module.exports={
    handleAddComment,handleUpdateComment,handleDeleteComment,showHandleUpdateComment
}