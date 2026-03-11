const express = require("express")
const app = express();
const ejs = require("ejs")
require('dotenv').config()
const { mongoose } = require("mongoose")
const axios = require("axios")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const nodemailer = require("nodemailer")


const {
    add_mulk, delete_mulk, update_mulk,
    add_user, delete_user, update_user
} = require("./middleware/db_crud.js")
const token_gerenate = require("./middleware/token_gerenate.js")
const check_user = require("./middleware/check.js")
const login_register = require('./controller/post_request.js');
const reflesh_token_generate = require("./controller/reflesh-token-generate.js");
const mulk_crud = require('./controller/mulk_crud.js');
const nodemailer_sent = require('./middleware/nodemailer.js');
const advisor_crud = require("./controller/advisor_crud.js")
//////////////////////////////// SCHEMA
const User_Schema = require("./schema/user.js");
const Mulk = require("./schema/mulk.js");




//AYARLAR
app.set("view engine", "ejs")
app.use(express.static("./public"))
// const __dirname = path.dirname(new URL(import.meta.url).pathname)
// app.use(express.static(path.join(__dirname, './public')));
// console.log(__dirname)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
// MONGOOSE 

mongoose.connect(`mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.uefzn.mongodb.net/emlak`)
    .then(() => console.log("connect mongodb"))

//ROUTE
app.post("/register", login_register.login_register);
app.post("/login", login_register.login);
app.post("/refleshToken", reflesh_token_generate.ref_token);
app.post("/mulk_create", mulk_crud.mulk_create);
app.post("/mulk_delete", mulk_crud.mulk_delete);
app.post("/advisor_create", advisor_crud.advisor_create);
app.post("/advisor_delete", advisor_crud.advisor_delete);






app.get("/about", check_user.check_user, (req, res) => {
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    res.render("about", {
        user_aut: user_aut,
        user_autjwt: user_autjwt
    })
});
app.get("/contact", check_user.check_user, (req, res) => {
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    res.render("contact", {
        user_aut: user_aut,
        user_autjwt: user_autjwt
    })
});
app.get("/property-single/:id", check_user.check_user, async (req, res) => {
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    const mulk_id = req.params.id
    try {
        const mulk_data = await Mulk.findById(mulk_id)
        var mulk_data_array = new Array(mulk_data)
    } catch (err) {
        if (err) {
            console.log(err.message)
            res.redirect("/")
        }
    }
    res.render("property-single", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        mulk_data_array
    })


});
app.get("/properties", check_user.check_user, async (req, res) => {
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    // DATABASE SORGU MULK
    const mulk_data = await Mulk.find()
    res.render("properties", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        mulk_data
    })

});
app.get("/", check_user.check_user, async (req, res) => {

    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {

        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    // DATABASE SORGU MULK
    try {
        var mulk_data = await Mulk.find()
    } catch (err) {
        console.log(err.message)
    }

    res.render("index", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        mulk_data
    })

});







app.get("/blog-single", (req, res) => {
    res.render("blog-single")

});
app.get("/blog", (req, res) => {
    res.render("blog")

});





app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000, console.log("http://localhost:3000", "listen 3000"));