const express = require("express")
const app = express();
const ejs = require("ejs")
require('dotenv').config()
const { mongoose, now } = require("mongoose")
const axios = require("axios")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const nodemailer = require("nodemailer")
//puppeteer-core
const puppeteer = require('puppeteer-core')
const fs = require('fs').promises
const path = require('path')
// puppeteer-core
const {
    add_mulk, delete_mulk, update_mulk,
    add_user, delete_user, update_user
} = require("./middleware/db_crud.js")
const token_gerenate = require("./middleware/token_gerenate.js")
const check_user = require("./middleware/check.js")
const login_register = require('./controller/post_request.js');
const reflesh_token_generate = require("./controller/reflesh-token-generate.js");
const mulk_crud = require('./controller/mulk_crud.js');
const nodemailer_ihtiyac_send = require('./controller/nodemail.js');
const advisor_crud = require("./controller/advisor_crud.js")
const blog_crud = require('./controller/blog_crud.js')
//////////////////////////////// SCHEMA
const User_Schema = require("./schema/user.js");
const Mulk = require("./schema/mulk.js");
const Blog = require('./schema/blog-single.js');




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
app.post("/ihtiyac_mail", nodemailer_ihtiyac_send.ihtiyac_send);
app.post("/basvuru_mail", nodemailer_ihtiyac_send.basvuru_send);
app.post('/contact_mail', nodemailer_ihtiyac_send.contact_send);
app.post('/blog_single_create', blog_crud.blog_create);


app.get("/admin", check_user.check_user, async function (req, res) {
    var page = 'admin'
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    res.render("admin-panel", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        page
    })
})
app.get("/admin/gayrimenkul", check_user.check_user, async function (req, res) {
    var user_data = req.user
    var page = 'gayrimenkul'
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    res.render("admin-panel", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        page
    })
})
app.get("/pdf", async function (req, res) {
    try {

        // Launch the browser and open a new blank page.
        const browser = await puppeteer.launch({

            headless: true,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // this would launch the binary at the path
            channel: 'stable', //  this will launch the binary installed on the system (might not detect the installation everywhere).
            args: [
                // `--proxy-server=http://${message.proxy}`,
                '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
                '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end',
                `--window-size=1920,1080`,
                "--window-position=000,000",
                "--disable-dev-shm-usage",
                "--no-sandbox",
            ]
        });

        const page = await browser.newPage();

        const html_page = await fs.readFile(`${__dirname}/views/panel-page/istatistik.ejs`, 'utf8');
        await page.setContent(html_page, { waitUntil: 'domcontentloaded' });
        await page.addStyleTag({ path: `${__dirname}/public/admin-panel/css/sb-admin-2.css` })
        await page.addStyleTag({ path: `${__dirname}/public/admin-panel/css/pdf_page.css` })
        // await page.addStyleTag({ content: 'body { margin-top: 100px;} card {flex-direction: row;!important}' });

        const pdfBuffer = await page.pdf();

        await browser.close();

        res.set(
            {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline'
            }
        )
        res.send(pdfBuffer)
    } catch (error) {
        if (error) {
            console.log(error.message)
            res.status(500).send('pdf oluşturulamadı')
        }
    }
});
app.get("/blog-single/:id", check_user.check_user, async function (req, res) {
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    const blog_single_id = req.params.id
    const blog_single = await Blog.findById(blog_single_id)
    res.render("blog-single", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        blog_single
    })

});
app.get("/blog", check_user.check_user, async (req, res) => {
    var user_data = req.user
    if (user_data === null) {
        var user_aut = null
        var user_autjwt = null
    }
    if (user_data !== null) {
        var user_aut = user_data[1]
        var user_autjwt = user_data[0].data
    }
    const blog_single = await Blog.find()
    res.render("blog", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        blog_single
    })

});
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
        user_aut,
        user_autjwt,
        mulk_data_array,
        mulk_id
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
app.get("/", check_user.check_user, async function (req, res) {
    try {
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

        var mulk_data = await Mulk.find();
        var blog_single = await Blog.find();
    } catch (err) {
        console.log(err.message)
    }

    res.render("index", {
        user_aut: user_aut,
        user_autjwt: user_autjwt,
        mulk_data,
        blog_single
    })
})





app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000, console.log("http://localhost:3000", "listen 3000"));