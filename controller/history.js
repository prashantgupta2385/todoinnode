const History=require("../models/history")

async function handleShowUserHistory(req,res){
    const history = await History.find({ userId:req.user._id}).populate("blogId");
  
    return res.render("history", { history });
}
module.exports={
    handleShowUserHistory,
}