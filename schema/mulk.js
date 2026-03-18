const mongoose = require("mongoose");

const mulkSchema = new mongoose.Schema({
    price: String,
    adress: String,
    room: Number,
    bedroom: Number,
    bath: Number,
    area_net: Number,
    area_brut: Number,
    province: String,
    country: String,
    image: {
        type: Array
    },
    metin1: String,
    metin2: String,
    proje: {
        type: Boolean,
        default: false
    },
    cinsi: {
        type: String,
        enum: ['arsa', 'tarla', 'konut'],
        default: 'konut'
    },
    cesid: {
        type: String,
        enum: ['ticari', 'kiralık', 'proje', 'satılık'],
        default: 'satılık'
    },
    hiz_ilan: {
        type: String,
        enum: ['ilan', 'hizmet'],
        default: 'ilan'
    },
    vitrin: {
        type: Boolean,
        default: false
    },
    seri_number: {
        type: String,
        default: (Date.now() + Math.floor(Math.random() * 10)).toString()
    }
})


module.exports = mongoose.model("Mulk", mulkSchema)
