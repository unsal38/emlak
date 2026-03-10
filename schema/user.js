import mongoose, { Mongoose } from "mongoose";

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
    authentication: String
})


const User = mongoose.model("User", userSchema)
export default User