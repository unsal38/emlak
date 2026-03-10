import mongoose, { Mongoose } from "mongoose";

const mulkSchema = new mongoose.Schema({
    price: String,
    adress: String,
    room: Number,
    bedroom: Number,
    bath: Number,
    area_net:Number,
    area_brut:Number,
    province:String,
    country: String,
    image:String,
    metin1: String,
    metin2: String,
})


const Mulk = mongoose.model("Mulk", mulkSchema)
export default Mulk