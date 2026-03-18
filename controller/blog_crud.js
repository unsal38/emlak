const db_crud = require("../middleware/db_crud.js")
const blog_create = function blog_create(req, res) {

    try {
        const data = req.body
        const data_creat = {
            title: data[0], //: String,
            text: data[1],  //: Array,
            image: data[2],    //: String,
            blog_single_image: data[3], //: String,
        }
        db_crud.add_blog_single(data_creat)
        res.send(true)
    } catch (error) { console.log(error, "blog curid js") }

}
const blog_delete = function blog_delete(req, res) {
    try {
        let data = req.body
        db_crud.delete_blog(data._id)
        res.send(true)
    } catch (error) { console.log(error, "blog curid js") }
}
module.exports = {
    blog_create,
    blog_delete
}