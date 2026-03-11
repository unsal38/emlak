const ejs = require("ejs") 
const token_jwt = require("./token_gerenate.js") 
const cookieParser = require("cookie-parser") 
const check_user = function (req, res, next) {
    try {
        const cookie_data = req.cookies
        const check_null = cookie_data.autjwt
        if (check_null !== undefined) {
            const cookie_aut_jwt = req.cookies.autjwt
            const cookie_aut = req.cookies.aut
            const user_data = token_jwt.check_access_token(cookie_aut_jwt)
            var data = [user_data, cookie_aut]
        } else if (check_null === undefined) { var data = null }

        req.user = data
        next()
    } catch (err) {
        if (err) {
            // req.cookies.remove 
            console.log(err.message, "check users")
            next()
        }
    }
}
const check_post = function (req, res, next) {
    
}
// const check_url = async function (req, res, next) {
//     try {
//         const url_data = req.url
//         const url_split = url_data.split("/")
//         const url_data1 = ["blog-single", "blog", "about", "contact", "properties", "property-single", " "]
//         const data_check1 = url_data1.find(data => data === url_split[1])
//         console.log(data_check1,url_split[1], "lenght")
        


//         next()

//         // if (url_data === "/") {
//         //     next()
//         // } else if (url_split.length > 2) {

//         //     const check_data = url_data.find(data => data === url_split[1])
//         //     const check_data1 = special_character.find(data => data === url_split[2])



//         //     if (check_data === undefined || check_data.length < 1 || check_data1 !== undefined) {
//         //         ejs.renderFile('views/404.ejs', (err, html) => {
//         //             if (err) {
//         //                 res.status(500).send(err);
//         //             }
//         //             res.send(html);
//         //         });
//         //     } else next()
//         // } else if (url_split.length <= 2) {
//         //     const url_data = ["blog-single", "blog", "about", "contact", "properties", "property-single", ""]
//         //     const check_data = url_data.find(data => data === url_split[1])
//         //     if (check_data === undefined || check_data.length < 1) {
//         //         ejs.renderFile('views/404.ejs', (err, html) => {
//         //             if (err) {
//         //                 res.status(500).send(err);
//         //             }
//         //             res.send(html);
//         //         });
//         //     } else next()

//         // } else {
//         //     next()
//         // }
//     } catch (err) {
//         if (err) console.log(err, "check.js")
//     }
// }
module.exports = {
    check_user
}