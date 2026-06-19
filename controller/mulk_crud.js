const db_crud = require("../middleware/db_crud.js")
const token_gerenate = require("../middleware/token_gerenate.js")




const mulk_create = async function mulk_create(req, res) {

    try {
        const data = req.body
        if (data) {
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
                image_small: data[9], //:String SONRASINDA DEĞİŞTİR
                metin1: data[10], // String
                metin12: data[11], // String
                ilan_cinsi: data[12], //['arsa', 'tarla', 'konut'],
                ilan_cesid: data[13], //['ticari', 'kiralık', 'proje', 'satılık'],
                hiz_ilan: data[14], //['ilan', 'hizmet'],
                vitrin: data[15], //boolean 
                hizmet_cesid: data[16], // enum: ['sigorta', 'kiralama', 'temizlik', 'tadilatvekomplebakim'],
                seri_number: data[17] // (Date.now() + Math.floor(Math.random() * 10)).toString()
            }
            db_crud.add_mulk(data_creat)
            res.send(true)
        }


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
const mulk_update = function mulk_update(req, res) {
    try {
        let data = req.body
        const filter = data.seri_number
        const update = data.update
        db_crud.findone_update_mulk(filter, update)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }
}
const mulk_search = async function mulk_search(req, res) {
    let data = req.body
    const db_search = await db_crud.find_one(data)
    // console.log(db_search, 'mulk crud')
    res.send(true)
}
module.exports = {
    mulk_create,
    mulk_delete,
    mulk_update,
    mulk_search
}