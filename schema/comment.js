const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    blog_singile_id: String,
    text: Array,
    email: String,
    name: String,
    surname: String,
    answer: String,
    createdAt:  { type: Date, default: Date.now },
    updatedAt:  { type: Date, default: Date.now },
},
    { timestamps: true })
const comment_blog_singile = mongoose.model("comment_blog_singile", commentSchema)
module.exports = { comment_blog_singile }