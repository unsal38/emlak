const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    tel_number: Number,
    reflesh_token: String,
    authorization: {
        type: String,
        default: "user" // advisor
    },
    authentication: String,
    small_image: Array,
    metin:String,
    instagram: String,
    facebook: String,
    twitter: String,
    linkedln: String
})


module.exports = mongoose.model("User", userSchema)