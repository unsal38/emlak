
// AXİOS POST FUNCTİON

function axios_data(url, data) {
    const base_url = window.location.origin
    let myPromise = new Promise(async function (resolve, reject) {
        await axios.post(`${base_url}/${url}`, data, {
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
        const seri_number_filter = { seri_number }
        const update = { image_large: [] }
        const data = {
            seri_number_filter,
            update
        }
        axios_data('mulk_update', data)
        window.location.reload()
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
            window.location.reload()
        })


    });
}) // büyük fotoğraf ekleme
$(() => {
    $('#seri-number-duzenle').on('click', async function () {
        const seri_number = $('input[name="seri-number-duzenle"]').val()
        let seri_number_filter = { seri_number: seri_number }
        const axios_data_answer = await axios_data('mulk_search', seri_number_filter)
        const _id = axios_data_answer.data[0]._id
        const price = axios_data_answer.data[0].price
        $(`#mulk-search li span[data-id="price"]`).text(`${price}`)
        const adress = axios_data_answer.data[0].adress
        $(`#mulk-search li span[data-id="adress"]`).text(`${adress}`)
        const room = axios_data_answer.data[0].room
        $(`#mulk-search li span[data-id="room"]`).text(`${room}`)
        const bedroom = axios_data_answer.data[0].bedroom
        $(`#mulk-search li span[data-id="bedroom"]`).text(`${bedroom}`)
        const bath = axios_data_answer.data[0].bath
        $(`#mulk-search li span[data-id="bath"]`).text(`${bath}`)
        const area_net = axios_data_answer.data[0].area_net
        $(`#mulk-search li span[data-id="area_net"]`).text(`${area_net}`)
        const area_brut = axios_data_answer.data[0].area_brut
        $(`#mulk-search li span[data-id="area_brut"]`).text(`${area_brut}`)
        const province = axios_data_answer.data[0].province
        $(`#mulk-search li span[data-id="province"]`).text(`${province}`)
        const country = axios_data_answer.data[0].country
        $(`#mulk-search li span[data-id="country"]`).text(`${country}`)
        const image_large = axios_data_answer.data[0].image_large
        $(`#mulk-search li span[data-id="image_large"]`).text(`${image_large}`)
        const image_small = axios_data_answer.data[0].image_small
        $(`#mulk-search li span[data-id="image_small"]`).text(`${image_small}`)
        const metin1 = axios_data_answer.data[0].metin1
        $(`#mulk-search li span[data-id="metin1"]`).text(`${metin1}`)
        const metin2 = axios_data_answer.data[0].metin2
        $(`#mulk-search li span[data-id="metin2"]`).text(`${metin2}`)
        const ilan_cinsi = axios_data_answer.data[0].ilan_cinsi
        $(`#mulk-search li span[data-id="ilan_cinsi"]`).text(`${ilan_cinsi}`)
        const ilan_cesid = axios_data_answer.data[0].ilan_cinsi
        $(`#mulk-search li span[data-id="ilan_cesid"]`).text(`${ilan_cesid}`)
        const hizmet_cesid = axios_data_answer.data[0].hizmet_cesid
        $(`#mulk-search li span[data-id="hizmet_cesid"]`).text(`${hizmet_cesid}`)
        const hiz_ilan = axios_data_answer.data[0].hiz_ilan
        $(`#mulk-search li span[data-id="hiz_ilan"]`).text(`${hiz_ilan}`)
        const vitrin = axios_data_answer.data[0].vitrin
        if (vitrin === true) { $(`#mulk-search li span[data-id="vitrin"]`).text(`evet`) }
        if (vitrin === false) { $(`#mulk-search li span[data-id="vitrin"]`).text(`hayır`) }
        const seri_number_db = axios_data_answer.data[0].seri_number
        $(`#mulk-search li span[data-id="seri_number"]`).text(`${seri_number_db}`)

    });
    $('button[data-bs-dismiss="modal"]').on('click', function () {
        const target_id = $(this).attr('name')
        $(`#${target_id}`).removeClass('show').removeClass('d-block')
    })
    $('button[data-bs-target="#mulk-search"]').on('click', function () {
        const target_id = $(this).attr('name')
        $(`#${target_id}`).addClass('show').addClass('d-block')
    })
    function update_data(seri_number_, data) {
        const seri_number_data = $(this).attr('data-seri-nu')
        const seri_number_filter = { seri_number: seri_number_ }
        const update = data
        const data_axios = {
            seri_number_filter,
            update
        }
        axios_data('mulk_update1', data_axios)
    }
    $('form#gayrimenkul button:not(#seri-number-duzenle):not(#seri-number-ekle):not(#seri-number-sil)').on('click', function () {
        let seri_number_input_data = $('input[name="seri-number-duzenle"]').val()
        const target_id_name = $(this).attr('id')
        const input_data = $(`input[name="${target_id_name}"]`).val()
        if (input_data === undefined || input_data === 'undefined') {
            const target_name = $(this).attr('name')
            const input_data_select = $(`select[name="${target_name}"] option:selected`).val()
            const d = [`${target_name}`, input_data_select]
            update_data(seri_number_input_data, d)
            window.location.reload()
        } else {
            const d = [`${target_id_name}`, input_data]
            update_data(seri_number_input_data, d)
            window.location.reload()
        }
    });

}) // mülk düzenleme
$(() => {
    $('input[data-seri-nu]').on('change', function () {
        const seri_number = $(this).attr('data-seri-nu')
        let seri_number_filter = { seri_number: seri_number }
        const upload_file = uploadFile('image_large', 'small')
        upload_file.then((res) => {
            const image_name = new Array()
            const res_data = res.data.upload_image

            const update = { image_small: res_data }
            const data = {
                seri_number_filter,
                update
            }
            axios_data('mulk_update', data)
            window.location.reload()
        })


    });
}) // küçük fotoğraf ekleme
$(() => {
    $('#gayrimenkul button#seri-number-sil').on('click', function () {
        const data_input = $('input[name="seri-number-duzenle"]').val()
        if (data_input.length === 0) {
            return alert('seri numarası seçiniz')
        } else {
            const data = { seri_number: data_input }
            const myPromise = axios_data("mulk_delete", data)
            myPromise.then((res) => console.log(res.data, "index js 150"))
        }
    });
}) //// delete  mulk
$(() => {
    $('.kullanici p button').on('click', function () {
        $('.kullanici .collapse').removeClass('show')
    })// buttonların TIKLANDIĞINDA DİĞERİNİ GİZLEMEK İÇİN KULLANICI BÖLÜMÜ
    $('input[name="kullanici-search-text"]').on('change', function () {
        const target_button = $('.kullanici button')

        $(target_button).each(function (i, v) {
            const button_data = $(v).text()
            const data_target = button_data.toUpperCase().trim()
            const search_data = $('input[name="kullanici-search-text"]').val()
            const data_search = search_data.toUpperCase().trim()
            const search__ = data_target.indexOf(data_search)
            if (search__ < 0) { $(v).hide() }
            if (search__ >= 0) { $(v).show('slow') }
        });

    }) // SEARCH BUTTON KULLANICI BÖLÜMÜ
    $('button[name="ekle"]').on('click', function () {
        ///İLK EKLEME//

        // let name = 'ahmet'
        // let surname = 'özkara'
        // let email = 'adfds'
        // let password = '123'
        // let tel_number = '3453'

        ///İLK EKLEME//


        let name = $('#Input-name').val()
        let surname = $('#Input-surname').val()
        let email = $('#Input-email').val()
        let password = $('#Input-password').val()
        let tel_number = $('#Input-tel_number').val()

        const target_data = $('#ekle .card input').not('#small_photo_kullanici')

        for (let index = 0; index < target_data.length; index++) {
            const element = target_data[index];
            const val_check = $(element).val()
            if (val_check.length > 0) {
                $(element).addClass('valid')
                $(element).removeClass('invalid')
            }
            if (val_check.length <= 0) {
                $(element).addClass('invalid')
                $(element).removeClass('valid')
            }
        }
        const input = $('#kullanici_photo input')
        const file = $(input)[0].files
        if (file.length > 0) {
            $(input).addClass('valid')
            $(input).removeClass('invalid')
        }
        if (file.length <= 0) {
            $(input).addClass('invalid')
            $(input).removeClass('valid')
        }
        const valid_check = $('#ekle .card input.invalid')
        if (valid_check.length > 0) { alert('boş alanları doldurun') }
        if (valid_check.length <= 0) {
            const upload_file = uploadFile('kullanici_photo', 'small')
            upload_file.then((res) => {
                const image_name = new Array()
                const res_data = res.data.upload_image
                const data = [
                    name,    //name: String,
                    surname,    //surname: String,
                    email,  //email: String,
                    password,  //password: String,
                    tel_number,    //tel_number: Number,
                    res_data //small_image
                ]
                const myPromise = axios_data("advisor_create", data)
                myPromise.then((res) => console.log(res.data, "index js 172"))
                window.location.reload()
            })
        }
    })

}) //// create new advisor  
$(() => {

    $('button[name="kullanici-sil"]').on('click', function () {
        const kullanici_button_data = $(this).attr('data-id')
        const kullanici_id = kullanici_button_data.split('k')[1]
        const data = { _id: kullanici_id }
        const myPromise = axios_data("advisor_delete", data)
        myPromise.then((res) => console.log(res.data, "index js 773"))
        window.location.reload()
    })

}) //// delete  advisor
$(() => {
    $('button[name="kullanici-update"]').on('click', function () {
        const kullanici_id = $(this).attr('data-id')
        const data_input = $(`div#${kullanici_id} input`)
        const input_data_array = new Array()
        for (let index = 0; index < data_input.length; index++) {
            const element = data_input[index];
            const element_value = $(element).val()
            if (element_value.length > 0) {
                input_data_array.push(element_value)
            } else if (element_value.length <= 0) {
                const element_place_holder = $(element).attr('placeholder')
                input_data_array.push(element_place_holder)
            }
        }
        const _id = kullanici_id.split('k')[1]
        input_data_array.push(_id)
        const data = { data: input_data_array}
        const myPromise = axios_data("advisor_update", data)
        myPromise.then((res) => console.log(res.data, "index js 773"))
        window.location.reload()
    });
})// update advisor




$(() => {

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
