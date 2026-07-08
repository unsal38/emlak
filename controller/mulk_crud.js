const fs = require('fs')
const path = require('path')
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
function delete_file(file_name) {
    fs.unlink(file_name, (err) => {
        if (err) {
            console.error('An error occurred:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });
}

const mulk_delete = async function mulk_delete(req, res) {
    try {
        let data = req.body
        const check_data = await db_crud.find_one(data)
        const image_data_1x1 = check_data[0].image_small
        const image_data_5x5 = check_data[0].image_large
        if (image_data_1x1.length > 0) {
            for (let index = 0; index < image_data_1x1.length; index++) {
                const element_small = image_data_1x1[index];
                const path_1x1 = path.join(__dirname, '../public/images/mulk-images/1x1', element_small)
                await delete_file(path_1x1)
            }
        }
        if (image_data_5x5.length > 0) {
            for (let index = 0; index < image_data_5x5.length; index++) {
                const element_large = image_data_5x5[index];
                const path_5x5 = path.join(__dirname, '../public/images/mulk-images/5x5', element_large)
                await delete_file(path_5x5)
            }
        }
        db_crud.delete_mulk(check_data[0]._id)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }
}
const mulk_update = function mulk_update(req, res) {
    try {
        let data = req.body
        const filter = data.seri_number_filter
        const update = data.update
        db_crud.findone_update_mulk(filter, update)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }
}
const mulk_update1 = async function mulk_update(req, res) {
    try {

        let data = req.body
        const filter = { seri_number: data.seri_number_filter.seri_number }
        const update = data.update
        const data_set = update[0]
        const data_value = update[1]
        if (data_set === 'price') { await db_crud.findone_update_mulk(filter, { price: data_value }) }
        if (data_set === 'adress') { await db_crud.findone_update_mulk(filter, { adress: data_value }) }
        if (data_set === 'room') { await db_crud.findone_update_mulk(filter, { room: data_value }) }
        if (data_set === 'bedroom') { await db_crud.findone_update_mulk(filter, { bedroom: data_value }) }
        if (data_set === 'bath') { await db_crud.findone_update_mulk(filter, { bath: data_value }) }
        if (data_set === 'area_net') { await db_crud.findone_update_mulk(filter, { area_net: data_value }) }
        if (data_set === 'area_brut') { await db_crud.findone_update_mulk(filter, { area_brut: data_value }) }
        if (data_set === 'province') { await db_crud.findone_update_mulk(filter, { province: data_value }) }
        if (data_set === 'country') { await db_crud.findone_update_mulk(filter, { country: data_value }) }
        if (data_set === 'image_large') { await db_crud.findone_update_mulk(filter, { image_large: data_value }) }
        if (data_set === 'image_small') { await db_crud.findone_update_mulk(filter, { image_small: data_value }) }
        if (data_set === 'metin1') { await db_crud.findone_update_mulk(filter, { metin1: data_value }) }
        if (data_set === 'metin2') { await db_crud.findone_update_mulk(filter, { metin2: data_value }) }
        if (data_set === 'ilan_cinsi') { await db_crud.findone_update_mulk(filter, { ilan_cinsi: data_value }) }
        if (data_set === 'ilan_cesid') { await db_crud.findone_update_mulk(filter, { ilan_cesid: data_value }) }
        if (data_set === 'hizmet_cesid') { await db_crud.findone_update_mulk(filter, { hizmet_cesid: data_value }) }
        if (data_set === 'hiz_ilan') { await db_crud.findone_update_mulk(filter, { hiz_ilanhiz_ilan: data_value }) }
        if (data_set === 'vitrin') { await db_crud.findone_update_mulk(filter, { vitrin: data_value }) }
        if (data_set === 'seri_number') { await db_crud.findone_update_mulk(filter, { seri_number: data_value }) }
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }
}
const mulk_search = async function mulk_search(req, res) {
    let data = req.body
    const db_search = await db_crud.find_one(data)
    res.send(db_search)
}


module.exports = {
    mulk_create,
    mulk_delete,
    mulk_update,
    mulk_update1,
    mulk_search,
    
}