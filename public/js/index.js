
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

$(()=> {
    const check_jwt = local_storage("reed", "autjwt")
    check_jwt.then((v)=>{
        const url = "refleshToken"
        const data = {
            jwt : v
        }
        const promise = axios_data(url, data)
        promise.then(i=> {
            if(i.data === "JWT undefined") {
                local_storage("all_remove")
                Cookies.remove("autjwt")
                Cookies.remove("aut")
            }else {
                local_storage("set","autjwt", i.data)
                Cookies.set("autjwt", i.data)
            }
        })
    })
}) // check autjwt