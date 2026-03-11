const  db_crud = require("../middleware/db_crud.js") 
const  token_gerenate = require("../middleware/token_gerenate.js") 
const mulk_create =  function mulk_create(req, res) {

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
        }
        db_crud.add_mulk(data_creat)
        res.send(true)
    } catch (error) { console.log(error, "mulk curid js") }

}
const mulk_delete =  function mulk_delete(req, res) {
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




// import db_crud from "../middleware/db_crud.js"
// import token_gerenate from "../middleware/token_gerenate.js"
// export function mulk_create(req, res) {

//     try {
//         const data = req.body
//         const data_creat = {
//             price: data[0], //: String,
//             adress: data[1],  //: String,
//             room: data[2],    //: Number,
//             bedroom: data[3], //: Number,
//             bath: data[4],  //: Number,
//             area_net: data[5], //:Number,
//             area_brut: data[6], //:Number,
//             province: data[7], //:String,
//             country: data[8], //: String,
//             image: data[9], //:String
//         }
//         db_crud.add_mulk(data_creat)
//         res.send(true)
//     } catch (error) { console.log(error, "mulk curid js") }

// }
// export function mulk_delete(req, res) {
//     try {
//         let data = req.body
//        // const data = { _id: "qqqqq" }

//         db_crud.delete_mulk(data._id)
//         res.send(true)
//     } catch (error) { console.log(error, "mulk curid js") }
// }
// export default {
//     mulk_create,
//     mulk_delete
// }