const mongoose = require("mongoose") ;

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


module.exports = mongoose.model("Mulk", mulkSchema)
