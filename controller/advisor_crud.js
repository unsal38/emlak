const db_crud = require("../middleware/db_crud.js")
const token_gerenate = require("../middleware/token_gerenate.js") 
const advisor_create =  function advisor_create(req, res) {

    try {
        const data = req.body
        const data_creat = {
            name: data[0], // String,
            surname: data[1], // String,
            email: data[2], // String,
            password: data[3], // String,
            tel_number: data[4], // Number,
            authorization: "advisor",
        }
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
module.exports = {
    advisor_create,
    advisor_delete
}




// import db_crud from "../middleware/db_crud.js"
// import token_gerenate from "../middleware/token_gerenate.js"
// export function advisor_create(req, res) {

//     try {
//         const data = req.body
//         const data_creat = {
//             name: data[0], // String,
//             surname: data[1], // String,
//             email: data[2], // String,
//             password: data[3], // String,
//             tel_number: data[4], // Number,
//             authorization: "advisor",
//         }
//         db_crud.add_advisor(data_creat)
//         res.send(true)
//     } catch (error) { console.log(error, "mulk curid js") }

// }
// export function advisor_delete(req, res) {
//     try {
//         let data = req.body
//         db_crud.delete_user(data._id)
//         res.send(true)
//     } catch (error) { console.log(error, "USER curid js") }
// }
// export default {
//     advisor_create,
//     advisor_delete
// }