import express from 'express' //require('express')
const app = express();
import ejs from 'ejs';
import 'dotenv/config'
import mongoose from 'mongoose';
import path from 'node:path';
import { default as axios } from "axios";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"


//import { fileURLToPath } from 'node:url';
//const __filename = fileURLToPath(import.meta.url); 



// İMPORT FİLE
import Mulk from './schema/mulk.js';
import User from './schema/user.js';
import {
    add_mulk, delete_mulk, update_mulk,
    add_user, delete_user, update_user
} from './middleware/db_crud.js';
import token_gerenate from './middleware/token_gerenate.js';
import login_register from './controller/post_request.js';
import reflesh_token_generate from "./controller/reflesh-token-generate.js";
import check_user from "./middleware/check_user.js"
//AYARLAR
app.set("view engine", "ejs")
const __dirname = path.join("public");
console.log('Directory path is :', __dirname);
app.use(express.static(__dirname))

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

app.get("/", check_user.check_user, (req, res, next) => {
    const url_data = ["blog-single", "blog", "about", "contact", "index", "properties", "property-single", ""]
    const chack_url = req.url
    const chack_url_data = chack_url.split("/")
    const url_data_length = chack_url_data.length
    const check_data = url_data.find(data => data === chack_url_data[1])
    if (url_data_length > 2) {
        res.render("404")
    } else if (check_data === undefined) {
        res.render("404")
    } else {
        next()
    }
});
app.get("/blog-single", (req, res) => {
    res.render("blog-single")

});
app.get("/blog", (req, res) => {
    res.render("blog")

});
app.get("/properties", (req, res) => {
    res.render("properties")

});
app.get("/property-single", (req, res) => {
    res.render("property-single")

});
app.get("/contact", (req, res) => {
    res.render("contact")

});
app.get("/about", (req, res) => {
    res.render("about")

});
app.get("/", check_user.check_user, (req, res) => {
    // console.log(req.user, "app.js")
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    res.render("index", {
        user_aut: user_aut, //"deneme"
        user_autjwt:  user_autjwt// "deneme" // 
    })

});





app.listen(3000, console.log("http://localhost:3000", "listen 3000"));