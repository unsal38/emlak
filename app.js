import express from 'express' //require('express')
const app = express();
import ejs from 'ejs';
import mongoose from 'mongoose';
import path from 'node:path';

//import { fileURLToPath } from 'node:url';
//const __filename = fileURLToPath(import.meta.url); 

import 'dotenv/config' 
  

//AYARLAR
app.set("view engine", "ejs")
const __dirname = path.join( "public"); 
console.log('Directory path is :', __dirname);
app.use(express.static(__dirname))
// MONGOOSE 

mongoose.connect(`mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.uefzn.mongodb.net/emlak`)
.then(()=>console.log("connect mongodb"))
//ROUTE


app.use("/", (req, res, next)=>{
    const url_data  = ["blog-single","blog", "about", "contact", "index", "properties","property-single", ""]
    const chack_url = req.url
    const chack_url_data = chack_url.split("/")
    const url_data_length = chack_url_data.length
    const check_data =  url_data.find(data => data === chack_url_data[1])
    if(url_data_length > 2) {
        res.render("404")
    }else if(check_data === undefined){
        res.render("404")
    }else {
        next()
    }
});
app.use("/blog-single", (req, res)=>{
    res.render("blog-single")
    
});
app.use("/blog", (req, res)=>{
    res.render("blog")
    
});
app.use("/properties", (req, res)=>{
    res.render("properties")
    
});
app.use("/property-single", (req, res)=>{
    res.render("property-single")
    
});
app.use("/contact", (req, res)=>{
    res.render("contact")
    
});
app.use("/about", (req, res)=>{
    res.render("about")
    
});
app.use("/", (req, res)=>{
    res.render("index")
    
});





app.listen(3000, console.log("http://localhost:3000","listen 3000"));