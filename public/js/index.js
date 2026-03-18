
// AXİOS POST FUNCTİON


function axios_data(url, data) {
    const base_url = window.location.origin
    let myPromise = new Promise(function (resolve, reject) {
        axios.post(`${base_url}/${url}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        ).then((response) => {
            resolve(response)
        }).catch(err => console.log(err, "index js axios"))
    });
    return myPromise
}
// AXİOS POST FUNCTİON
// LOCAL STORAGE
function local_storage(set, key, value) {
    const localPromise = new Promise((resolve, reject) => {


        if (set === "set") { localStorage.setItem(key, value); }
        if (set === "reed") {
            let data = localStorage.getItem(key);
            resolve(data)
        }
        if (set === "remove") { localStorage.removeItem(key); }
        if (set === "all_remove") { localStorage.clear(); }
    })
    return localPromise
}
// LOCAL STORAGE
$(() => {
    $("button[name='register-button']").on("click", function () {
        const data = $("#register form input")
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const check_element = $(element).val()
            if (check_element.length <= 0) {
                $(element).removeClass("check")
                return alert("tüm bilgileri doldurunuz.")
            } else { $(element).addClass("check") }
        }
        const data1 = $("#register form input#password1")
        const data2 = $("#register form input#password2")
        const data1val = $("#register form input#password1").val()
        const data2val = $("#register form input#password2").val()
        if (data1val !== data2val) {
            $(data1).removeClass("check")
            $(data2).removeClass("check")
            return alert("şifreler uyuşmuyor.")
        } else {
            $(data1).addClass("check")
            $(data2).addClass("check")
        }
        const data_check = $("#register form input.check")
        if (data_check.length === 6) {
            var data_array = new Array()
            for (let index = 0; index < 6; index++) {
                const element = data_check[index];
                const element_id = $(element).attr("id")
                const data_element = $(element).val()
                data_array.push({ element_id, data_element })
            }
            const url = "register"
            const myPromise = axios_data(url, data_array)

            myPromise.then((v) => { if (v.data === true) { alert("kayıt başarılı") } })

        } else { return alert("kayıt başarısız") }

    })
}); // REGİSTER

$(() => {
    $("button[name='login-button']").on("click", function () {
        const data = $("#login form input")
        const data_array = new Array
        for (let index = 0; index < 2; index++) {
            const element = data[index];
            data_array.push($(element).val())
        }
        const url = "login"
        const myPromise = axios_data(url, data_array)

        myPromise.then((v) => {
            if (v.data === false) { alert("Şifre Hatalı") }
            if (v.data !== false) {
                local_storage("set", "aut", v.data[0])
                local_storage("set", "autjwt", v.data[1])
                local_storage("set", "name", v.data[2])
                local_storage("set", "surname", v.data[3])
                Cookies.set("aut", v.data[0])
                Cookies.set("autjwt", v.data[1])
                location.reload();
                // const localPromise = local_storage("reed" ,"autjwt" )
                // console.log(localPromise)

            }
        })

    });
}) /// LOGİN

$(() => {
    const check_jwt = local_storage("reed", "autjwt")
    check_jwt.then((v) => {
        const url = "refleshToken"
        const data = {
            jwt: v
        }
        const promise = axios_data(url, data)
        promise.then(i => {
            if (i.data === "JWT undefined") {
                local_storage("all_remove")
                Cookies.remove("autjwt")
                Cookies.remove("aut")
            } else {
                local_storage("set", "autjwt", i.data)
                Cookies.set("autjwt", i.data)
            }
        })
    })
}) // check autjwt
$(() => {
    const check_div_id = $("#section4ModalToggle input")
    $("#section4ModalToggle2 button[name='submit']").on('click', async function () {

        for (let index = 0; index < 4; index++) {
            const i = check_div_id[index];
            const check_length = $(i).val().length
            if (check_length > 0) {
                $(i).addClass('is-valid')
                $(i).removeClass('is-invalid')
            }
            if (check_length === 0) {
                $(i).removeClass('is-valid')
                $(i).addClass('is-invalid')
            }
        }
        const check_valid = $("#section4ModalToggle input.is-invalid")
        if (check_valid.length > 0) alert('bilgiler eksik')
        if (check_valid.length === 0) {
            const mail_data_array = new Array

            const new_data_1 = $("#section4ModalToggle input")
            // const new_data_2 = $("#section4ModalToggle2 select")
            const new_data_2 = $("#section4ModalToggle2 select option:selected")
            const new_data_3 = $("#section4ModalToggle2 textarea")

            for (let index = 0; index < 4; index++) {
                const element = $(new_data_1[index]).val()
                mail_data_array.push(element)
            }
            for (let index = 0; index < 3; index++) {
                const element = new_data_2[index]
                const element_val = $(element).val()
                // const element_name = $(element).attr("name")
                // const child_element = $(element).children('option:selected:not([value="none"])').text()
                // const child_element = $(element).children('option:selected)').text()

                // if (child_element.length > 0) {
                //     // mail_data_array.push([element_name, child_element])
                //     mail_data_array.push(child_element)
                // })
                mail_data_array.push(element_val)
            }
            const textarea_check = $(new_data_3).val()
            // if (textarea_check.length > 0) mail_data_array.push(['textarea', textarea_check])
            if (textarea_check.length > 0) mail_data_array.push(textarea_check)
            if (textarea_check.length === 0) mail_data_array.push('null')

            const url = 'ihtiyac_mail'
            const data = mail_data_array
            const myPromise = await axios_data(url, data)
            myPromise.then((res) => console.log(res))
        }

    });
}) // İNDEX EJS İHTAYAÇ MAİL GÖNDERİLMESİ
$(() => {
    function valid_invalid() {
        const section5_input = $('#section5ModalToggle input')
        for (let index = 0; index < 4; index++) {
            const element = section5_input[index];
            const element_length = $(element).val().length
            if (element_length > 0) { $(element).addClass('is-valid').removeClass('is-invalid') }
            if (element_length === 0) { $(element).removeClass('is-valid').addClass('is-invalid') }
        }
    }
    $('a[href="#section5ModalToggle"]').on('click', function () { valid_invalid() })
    $('#section5ModalToggle').on('click', async function () {
        valid_invalid()
        const section5_input = $('#section5ModalToggle input.is-valid')
        const section5_input_length = $('#section5ModalToggle input.is-valid').length
        if (section5_input_length === 4) {
            const data_array = new Array
            for (let index = 0; index < 4; index++) {
                const element = section5_input[index]
                const element_value = $(element).val()
                data_array.push(element_value)
            }
            const url = 'basvuru_mail'

            const data = data_array
            await axios_data(url, data)
        }
    });
})// EKİBE KATILMAK İÇİN BAŞVURU
$(() => {

    const hedef = $('div.section-properties .property-item')
    const eklenecek_div = 6
    function src() {
        const hedef_gorunur = $(hedef).not('.d-none')
        $(hedef_gorunur).each(function (i, v) {
            const check = $(v)[0]
            const data_src = $(check).children().children().children().children('.carousel-item')
            for (let index = 0; index < data_src.length; index++) {
                const element = data_src[index];
                const element_img = $(element).children()
                const element_img_data_src = $(element_img).attr('data-src')
                $(element_img).attr('src', element_img_data_src)
            }
        });
    }

    for (let index = 6; index < hedef.length; index++) { $(hedef[index]).addClass('d-none') }
    $('#yukle').on('click', function () {
        const d_none_div = $('div.section-properties .d-none').length
        const toplam_div = $('div.section-properties .property-item').length
        const gosterilen_div = toplam_div - d_none_div
        const new_gosterilen_div = gosterilen_div + eklenecek_div
        for (let index = 0; index < new_gosterilen_div; index++) {
            $(hedef[index]).removeClass('d-none')
        }
        src()
    });
    src()
})// ilan ekleme ve data-src src çevirme
$(() => {
    $('input[name="submit_contact"]').on('click', async function () {
        const form_data = $('form#contact_mail input:not([name="submit_contact"])')
        const form_data_textarea = $('form#contact_mail textarea')

        for (let index = 0; index < 3; index++) {
            const check_input = $(form_data)[index]
            const check_value = $(check_input).val().length
            if (check_value > 0) {
                $(check_input).addClass('is-valid')
                $(check_input).removeClass('is-invalid')
            }
            if (check_value === 0) {
                $(check_input).addClass('is-invalid')
                $(check_input).removeClass('is-valid')
            }
        }

        const textarea_check_value = $(form_data_textarea).val().length
        if (textarea_check_value > 0) {
            $(form_data_textarea).addClass('is-valid')
            $(form_data_textarea).removeClass('is-invalid')
        }
        if (textarea_check_value === 0) {
            $(form_data_textarea).addClass('is-invalid')
            $(form_data_textarea).removeClass('is-valid')
        }
        const is_invalid_check = $('form#contact_mail .is-invalid').length
        const data_array = new Array
        if (is_invalid_check > 0) alert('İlgili alanları doldurunuz')
        if (is_invalid_check === 0) {
            for (let index = 0; index < 3; index++) {
                const element = form_data[index];
                const element_data = $(element).val()
                data_array.push(element_data)
            }
            const textarea_value = $(form_data_textarea).val()
            data_array.push(textarea_value)
            const url = 'contact_mail'
            const data = data_array
            await axios_data(url, data)

        }
    });
}) // CONTACT SAYFA MAİL GÖNDERME
$(() => {
    $('button[data-target="#yorumModal"]').on('click', function () {
        $('#yorumModal').addClass('show').addClass('d-block')
    })
    $('#yorumModal button[data-dismiss="modal"]').on('click', function () {
        $('#yorumModal').removeClass('show').removeClass('d-block')
    });
}) /// YORUM MODAL KAPANIP AÇILMA






$(() => {
    const random_number = (Date.now() + Math.floor(Math.random() * 10)).toString()
    const data = [
        "1,2002",  //  price: data[0], //: String,
        "büyükçekmeceek istanbul",  // adress: data[1],  //: String,
        3,  // room: data[2],    //: Number,
        2, // bedroom: data[3], //: Number,
        1,   // bath: data[4],  //: Number,
        123,    // area_net: data[5], //:Number,
        54,    // area_brut: data[6], //:Number,
        "satış",    // province: data[7], //:String,
        "girne",    // country: data[8], //: String,
        //["1.jpg", "2.jpg", "3.jpg"],   
        //["4.jpg", "5.jpg", "6.jpg"], 
        ["7.jpg", "8.jpg", "6.jpg"],
        //    metin1: , metin2 // String,
        "lorem ipsun Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minima perferendis laudantium porro numquam quaerat autem modi doloremque, vitae ad et soluta animi officiis. Necessitatibus aspernatur earum expedita adipisci perferendis?",
        "lorem ipsun Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minima perferendis laudantium porro numquam quaerat autem modi doloremque, vitae ad et soluta animi officiis. Necessitatibus aspernatur earum expedita adipisci perferendis?",
        false,//proje: "", // type: Boolean,
        'tarla',//cinsi: {
        //    type: String,
        //    enum: ['arsa', 'tarla', 'konut'],
        //    default: 'konut'
        //},
        'satılık',//cesid: {
        //    type: String,
        //    enum: ['ticari', 'kiralık', 'proje', 'satılık'],
        //    default: 'satılık'
        //},
        'hizmet', //hiz_ilan: {
        //    type: String,
        //    enum:['ilan', 'hizmet'],
        //    default: 'ilan'
        //},
        false,//         vitrin: {
        //     type: Boolean,
        //     default: false
        // },
        random_number//seri_number: {
        //    type:String,
        //    default: Date.now().toString()
        //}
    ]

    // const myPromise = axios_data("mulk_create", data)
    // myPromise.then((res) => console.log(res.data, "index js 144"))
}) //// create new mulk

$(() => {
    const data = { _id: "69ae7a307a9be043ae834e76" }
    // const myPromise = axios_data("mulk_delete", data)
    // myPromise.then((res) => console.log(res.data, "index js 150"))
}) //// delete  mulk

$(() => {
    const data = [
        "ahmet",    //name: String,
        "delidolu",    //surname: String,
        "ahmet@gmail.com",  //email: String,
        "123",  //password: String,
        123123,    //tel_number: Number,
    ]
    // const myPromise = axios_data("advisor_create", data)
    // myPromise.then((res) => console.log(res.data, "index js 172"))
}) //// create new advisor

$(() => {
    const data = { _id: "69ae7a307a9be043ae834e76" }
    // const myPromise = axios_data("advisor_delete", data)
    // myPromise.then((res) => console.log(res.data, "index js 172"))
}) //// delete  advisor
$(() => {
    const data = [
        "mülklerimiz",    //title: String,
        //text: Array,
        ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus."
        ],
        'flaticon-house',  //image:String,
        "img_1",  //blog_single_image: String
    ]
    const data1 = [
        "Satılık Garyrimülkler",    //title: String,
        //text: Array,
        ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus."
        ],
        'flaticon-building',  //image:String,
        "img_1",  //blog_single_image: String
    ]
    const data2 = [
        "Gayrimenkul Temsilcisi",    //title: String,
        //text: Array,
        ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus."
        ],
        'flaticon-building',  //image:String,
        "img_1",  //blog_single_image: String
    ]
    const data3 = [
        "Satılık Ev",    //title: String,
        //text: Array,
        ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, accusamus."
        ],
        'flaticon-house-1',  //image:String,
        "img_1",  //blog_single_image: String
    ]
    // const myPromise = axios_data("blog_single_create", data3)
    // myPromise.then((res) => console.log(res.data, "index js 380"))
}) /// BLOG OLUŞTURMA