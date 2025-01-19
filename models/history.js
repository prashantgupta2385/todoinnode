const {Schema,model}=require("mongoose");

const historySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const History = model("history", historySchema);
module.exports = History;
