import express from 'express' //require('express')
const app = express();
import ejs from 'ejs';
import 'dotenv/config'
import mongoose from 'mongoose';
//import path from 'node:path';
import { default as axios } from "axios";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"

// İMPORT FİLE
import Mulk from './schema/mulk.js';
import User from './schema/user.js';
import {
    add_mulk, delete_mulk, update_mulk,
    add_user, delete_user, update_user
} from './middleware/db_crud.js';
import token_gerenate from './middleware/token_gerenate.js';
import check_user from "./middleware/check.js"
import login_register from './controller/post_request.js';
import reflesh_token_generate from "./controller/reflesh-token-generate.js";
import mulk_crud from './controller/mulk_crud.js';
//////////////////////////////// SCHEMA
import user from "./schema/user.js";
import mulk from "./schema/mulk.js";


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








app.get("/property-single/:id",check_user.check_user, async (req, res) => {
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
    const mulk_data = await mulk.findById(mulk_id)
    const mulk_data_array = new Array(mulk_data)
    res.render("property-single",{
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
    const mulk_data = await mulk.find()
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
    const mulk_data = await mulk.find()
    res.render("index", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        mulk_data
    })

});







app.get("/blog-single", check_user.check_url, (req, res) => {
    res.render("blog-single")

});
app.get("/blog", check_user.check_url, (req, res) => {
    res.render("blog")

});


app.get("/contact", check_user.check_url, (req, res) => {
    res.render("contact")

});
app.get("/about", check_user.check_url, (req, res) => {
    res.render("about")

});









//app.get("/*path", check_user.check_url, (req, res) => { });
app.listen(3000, console.log("http://localhost:3000", "listen 3000"));