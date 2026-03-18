const db_crud = require("../middleware/db_crud.js")
const token_gerenate = require("../middleware/token_gerenate.js")
const mulk_create = function mulk_create(req, res) {

    try {
        const data = req.body
        const data_creat = {
            price: data[0], //: String,
            adress: data[1],  //: String,
            room: data[2],    //: Number,
            bedroom: data[3], //: Number,
            bath: data[4],  //: Number,
            area_net: data[5], //:Number,
            area_brut: data[6], //:Number,
            province: data[7], //:String,
            country: data[8], //: String,
            image: data[9], //:String
            metin1: data[10], // String
            metin12: data[11], // String
            proje: data[12], // boolen
            cinsi: data[13], //['arsa', 'tarla', 'konut'],
            cesid: data[14], //['ticari', 'kiralık', 'proje', 'satılık'],
            hiz_ilan: data[15], //['ilan', 'hizmet'],
            vitrin: data[16], //boolean 
            seri_number: data[17] // (Date.now() + Math.floor(Math.random() * 10)).toString()
        }
        db_crud.add_mulk(data_creat)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }

}
const mulk_delete = function mulk_delete(req, res) {
    try {
        let data = req.body
        // const data = { _id: "qqqqq" }

        db_crud.delete_mulk(data._id)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }
}
module.exports = {
    mulk_create,
    mulk_delete
}