
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
            console.log(response)
            resolve(response)
        }).catch(err => console.log(err, "index js axios"))
    });
    return myPromise
}

function uploadFile(id, large) {
    let promise_upload = new Promise(function (resolve, reject) {
        if (large === 'large') { var url = 'upload_image_large' } else { var url = 'upload_image' }
        // const url = 'upload_image' 
        const base_url = window.location.origin
        const input = $(`#${id} input`)
        const file = $(input)[0].files
        //// TEKLİ DOSYA GÖNDERİMİ
        // const file = event.target.files[0]
        // const formData = new FormData
        // formData.append('files', file); 
        //// TEKLİ DOSYA GÖNDERİMİ

        //// ÇOKLLU DOSYA GÖNDERİMİ
        const formData = new FormData
        for (let index = 0; index < file.length; index++) {
            formData.append('files', file[index])
        }
        // console.log(`${base_url}/${url}`,file)
        //// ÇOKLLU DOSYA GÖNDERİMİ
        axios.post(`${base_url}/${url}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((res) => resolve(res))
            .catch(err => console.log(err, "index js axios"))
    })

    return promise_upload
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
    const eklenecek_div = 6
    const hedef1 = $(`div.section-properties div.satilik div:not("d-none") .property-item`)
    const hedef2 = $(`div.section-properties div.kiralik div:not("d-none") .property-item`)
    const hedef3 = $(`div.section-properties div.ticari div:not("d-none") .property-item`)
    function src(data) {
        const hedef_gorunur = $(data).not('.d-none')
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
    function checkProje() {
        const checkProje_prop = $('#checkProje').prop('checked');
        if (checkProje_prop === true) {
            $(`div.section-properties  .property-item`).addClass('d-none')
            $(`div.section-properties  .property-item[data-proje='true']`).removeClass('d-none')
        }


        console.log(checkProje)
    }
    for (let index = 6; index < hedef1.length; index++) { $(hedef1[index]).addClass('d-none') }
    for (let index = 6; index < hedef2.length; index++) { $(hedef2[index]).addClass('d-none') }
    for (let index = 6; index < hedef3.length; index++) { $(hedef3[index]).addClass('d-none') }
    $('.yukle').on('click', function () {
        const select_button = $(this).attr('name')
        const d_none_div = $(`div.section-properties div.${select_button} div:not("d-none") .d-none`).length
        const toplam_div = $(`div.section-properties div.${select_button} div:not("d-none") .property-item`).length
        const gosterilen_div = toplam_div - d_none_div
        const new_gosterilen_div = gosterilen_div + eklenecek_div
        const hedef = $(`div.section-properties div.${select_button} div:not("d-none") .property-item`)
        for (let index = 0; index < new_gosterilen_div; index++) {
            $(hedef[index]).removeClass('d-none')
        }

        src(hedef)
    });
    src(hedef1)
    src(hedef2)
    src(hedef3)
    $('#checkProje').on('click', function () {
        const checkProje_prop = $('#checkProje').prop('checked');
        if (checkProje_prop === false) { window.location.reload() }
        checkProje()
    });


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
    $('div.section-properties a').on('click', function () {
        const target_id = $(this).attr('id')
        $('div.section-properties a').removeClass('active')
        $(`#${target_id}`).addClass('active')
        $(`#properties_body`).children('div').addClass('d-none')
        $(`#properties_body .${target_id}`).removeClass('d-none')
    });
}) // satılık kiralık seçimi ilanlarımız sayfası
$(() => {
    const url_data = window.location.pathname
    const sprit_url_data = url_data.split('/')[1]
    const sprit_url_data_length = url_data.split('/')[1].length
    const navbar_data_li = $('ul.site-menu li')
    const navbar_data_a = $('ul.site-menu li a')
    if (sprit_url_data_length === 0) {
        return
    } else {
        $(navbar_data_li).removeClass('active')
        const navbar_data_a = $(`ul.site-menu li a[href="${sprit_url_data}"]`)
        const a_parent = $(navbar_data_a).parent().addClass('active')
    }

})// ana menü active class verilmesi / silinmesi
$(() => {
    $('div.hero button.select-alt-menu').on('click', function () {
        $('div.hero button.active').removeClass('active')
        $(this).addClass('active')
        const button_parent = $(this).parent('.dropend')
        if (button_parent.length > 0) { $('div.hero div.dropend').addClass('active') } else { $('div.hero div.dropend').removeClass('active') }
    });
}) // alt menu aktif pasip yapma
$(() => {
    const url_check = window.location
    const data = url_check.pathname
    const data_split = data.split('/')[2]
    $('#wrapper .active').removeClass('active')
    if (data_split) {
        $(`#${data_split}`).addClass('active')
    } else {
        $('#admin').addClass('active')
    }
}) // PANEL ACTİV PASİF YAPMA
$(() => {
    $('#admin-search button').on('click', function () {
        const admin_search_text = $('input[name="admin-search-text"]').val().toLowerCase().replace(/^\s+|\s+$/gm, '');
        const check_area = $("#content").children('div').children(':not(".no-search")')
        const check_area_children = $(check_area).children()
        $(check_area_children).removeAttr('style')
        const filter_function = $(check_area_children).filter(function () {
            const find_text = $(this).text().indexOf(admin_search_text)
            if (find_text !== -1 && admin_search_text.length > 0) {
                $(this).css('background-color', 'red')
            }
            if (admin_search_text.length <= 0) { $(check_area_children).removeAttr('style') }
        })
    })
}) // ADMİN PANEL SEARCH
$(() => {
    function düzenle_active_pasive() {
        const selected_id_array = ['vitrin', 'hiz-ilan', 'hiz-cesid', 'ilan-cesid', 'ilan-cinsi']
        const check_input = $('input[name="seri-number-duzenle"]').val().length
        if (check_input <= 0) {
            $('#gayrimenkul button').not('#seri-number-ekle').attr('disabled', true)
            $.each(selected_id_array, function (i, v) {
                $(`button[name='${v}']`).attr('disabled', true)
            });
        }
        if (check_input > 0) {
            $.each(selected_id_array, function (i, v) {
                $(`button[name='${v}']`).removeAttr('disabled')
            });
        }
    }
    $('#gayrimenkul input').on('change', function () {
        const form_imput = $('#gayrimenkul input')

        $(form_imput).each(function (i, v) {
            const form_imput_val = $(v).val()
            const form_imput_val_length = $(v).val().length
            if (form_imput_val_length <= '0') {
                $(this).removeClass('is-valid')
                $(this).addClass('is-invalid')
                const name_input = $(this).attr('name')
                $(`button#${name_input}`).attr('disabled', true)
                $(`label[for='${name_input}']`).removeClass('d-none')
            }
            if (form_imput_val_length > '0') {
                $(this).removeClass('is-invalid')
                $(this).addClass('is-valid')
                const name_input = $(this).attr('name')
                $(`button#${name_input}`).removeAttr('disabled')
                $(`label[for='${name_input}']`).addClass('d-none')
            }
            düzenle_active_pasive()
        });

    });
}) // GAYRİMENKUL FORM 











$(() => {
    function upload_image() {
        const upload_file = uploadFile('gayrimenkul_photo')
        upload_file.then((res) => {
            const random_number = (Date.now() + Math.floor(Math.random() * 10)).toString()
            const upload_image_name = res.data.upload_image

            // SELECT BÖLÜMÜ 
            const selected_data = $('#gayrimenkul select option')
            const select_data_array = new Array()
            for (let index = 0; index < selected_data.length; index++) {
                const element = selected_data[index]
                const element_selected = $(element)[0].selected
                if (element_selected === true) {
                    const data = $(element).val()
                    select_data_array.push(data)
                }
            }
            // SELECT BÖLÜMÜ 

            // İNPUT BÖLÜMÜ 
            const input_data = $('#gayrimenkul input:not([name="seri-number-duzenle"])')
            const input_data_array = new Array()
            for (let index = 0; index < input_data.length; index++) {
                const element = input_data[index];
                const data = $(element).val()
                input_data_array.push(data)
            }
            // İNPUT BÖLÜMÜ 

            const data = [
                input_data_array[2],  //  price: data[0], //: String,
                input_data_array[3],  // adress: data[1],  //: String,
                input_data_array[6],  // room: data[2],    //: Number,
                input_data_array[7], // bedroom: data[3], //: Number,
                input_data_array[8],   // bath: data[4],  //: Number,
                input_data_array[9],    // area_net: data[5], //:Number,
                input_data_array[10],    // area_brut: data[6], //:Number,
                input_data_array[5],    // province: data[7], //:String,
                input_data_array[4],    // country: data[8], //: String,
                upload_image_name,// ["1.jpg", "8.jpg", "6.jpg"],
                input_data_array[0],
                input_data_array[1],//    metin1: , metin2 // String,
                select_data_array[4],
                //ilan_cinsi: {
                //    type: String,
                //    enum: ['arsa', 'tarla', 'konut'],
                //    default: 'konut'
                //},
                select_data_array[3],
                //ilan_cesid: {
                //    type: String,
                //    enum: ['ticari', 'kiralık', 'satılık'],
                //    default: 'satılık'
                //},
                select_data_array[1],
                //hiz_ilan: {
                //    type: String,
                //    enum:['ilan', 'hizmet'],
                //    default: 'ilan'
                //},
                select_data_array[0],
                // vitrin: {
                //     type: Boolean,
                //     default: false
                // },
                select_data_array[2],
                //   hizmet_cesid: {
                //     type: String,
                //     enum: ['sigorta', 'kiralama', 'temizlik', 'tadilatvekomplebakim'],
                //     default: 'temizlik'
                // },
                random_number
                //seri_number: {
                //    type:String,
                //    default: Date.now().toString()
                //}
            ]
            const myPromise = axios_data("mulk_create", data)
            myPromise.then((res) => {
                // console.log(res.data, "index js 144")
                if (res === true) window.location.reload

            })
        })
    }
    $('#seri-number-ekle').on('click', function () {
        const check_input = $('.is-invalid').not('[ name="seri-number-duzenle"]')
        const upload_input_check = $('#gayrimenkul_photo input')[0].files
        if (check_input.length > 0) {
            alert('Alanları Boş Bırakmayınız.')
        } else if (upload_input_check.length <= 0) { alert('Resim Alanını Boş Bırakmayınız.') }
        if (upload_input_check.length > 0 && check_input.length <= 0) {
            upload_image()
        }
    });
}) //// create new mulk ADD photo
$(() => {
    $('button[data-seri-nu]').on('click', function () {
        const seri_number = $(this).attr('data-seri-nu')
        const seri_number_filter = { seri_number: seri_number }
        const update = { image_large: [] }
        const data = {
            seri_number_filter,
            update
        }
        axios_data('mulk_update', data)
    });
}) // büyük fotoğraf silme
$(() => {
    $('input[data-seri-nu]').on('change', function () {
        const seri_number = $(this).attr('data-seri-nu')
        let seri_number_filter = { seri_number: seri_number }
        const upload_file = uploadFile('image_large', 'large')
        upload_file.then((res) => {
            const image_name = new Array()
            const res_data = res.data.upload_image

            const update = { image_large: res_data }
            const data = {
                seri_number_filter,
                update
            }
            axios_data('mulk_update', data)
        })


    });
}) // büyük fotoğraf ekleme
$(() => {
    $('#seri-number-duzenle').on('click',async function () {
        const seri_number = $('input[name="seri-number-duzenle"]').val()
        let seri_number_filter = { seri_number: seri_number }
        const axios_data = await axios_data('mulk_search', seri_number_filter)
        // axios_data.then(res=>console.log(res))
    });
}) // mülk düzenleme



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
