
const mongoose = require("mongoose");

const blog_singileSchema = new mongoose.Schema({
    title: String,
    text: Array,
    image: String,
    blog_single_image: String,
    createdAt:  { type: Date, default: Date.now },
    updatedAt:  { type: Date, default: Date.now },
})


module.exports  = mongoose.model("Blog", blog_singileSchema)
