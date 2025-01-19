const {Schema,model}=require("mongoose");
const Comment = require("./comments");
const History = require("./history");
const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
blogSchema.pre("deleteOne", { document: true }, async function (next) {
    const blogId = this._id; // Access the blog's ID
    console.log(blogId)

    try {
        console.log("Pre-deleteOne hook triggered for blog ID:", blogId);

        // Fetch all comments related to this blog
        const comments = await Comment.find({ blogId });
        console.log("Comments found:", comments);

        // Save each comment to the history collection
        for (const comment of comments) {
            await History.create({
                userId: comment.createdBy, // Save the user who created the comment
                blogId: comment.blogId, // Blog ID
                commentText: comment.content, // Comment text
                timestamp: comment.createdAt, // Comment creation timestamp
            });
        }

        // Delete all comments related to the blog
        await Comment.deleteMany({ blogId });

        console.log("Pre-deleteOne hook executed successfully.");
        next();
    } catch (error) {
        console.error("Error in pre-deleteOne hook:", error);
        next(error); // Pass the error to the next middleware
    }
});




const  Blog=model('blog',blogSchema);
module.exports=Blog;