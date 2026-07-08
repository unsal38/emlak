const db_crud = require("../middleware/db_crud.js")
const token_gerenate = require("../middleware/token_gerenate.js")
const advisor_create = function advisor_create(req, res) {

    try {
        const data = req.body
        const data_creat = {
            name: data[0], // String,
            surname: data[1], // String,
            email: data[2], // String,
            password: data[3], // String,
            tel_number: data[4], // Number,
            authorization: "advisor",
            small_image: data[5]
        }
        console.log(data_creat)
        db_crud.add_advisor(data_creat)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }

}
const advisor_delete = function advisor_delete(req, res) {
    try {
        let data = req.body
        db_crud.delete_user(data._id)
        res.send(true)
    } catch (error) { console.log(error, "USER curid js") }
}
const advisor_update = function advisor_create(req, res) {

    try {
        const data = req.body.data
        const _id = data[10]
        const data_update = {
            name: data[0], // String,
            surname: data[1], // String,
            email: data[6], // String,
            password: data[7], // String,
            tel_number: data[8], // Number,
            authorization: "advisor",
            metin: data[9],
            instagram: data[2],
            facebook: data[4],
            twitter: data[3],
            linkedln: data[5]
        }
        db_crud.update_user(_id, data_update)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }

}
module.exports = {
    advisor_create,
    advisor_delete,
    advisor_update
}
