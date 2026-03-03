

/* function axios(data1) {
    console.log("çalıştı")
    const data = "deneme"
    axios.post("/get_request",data)
} */






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

        } else { return }
        console.log(data_array)
    })
    const data = { deneme: "güzel bir gün" }
    const data1 = "deneme"
    const url = "https://reqres.in/api/users"
    const url1 = "http://localhost:3000/deneme"


    axios.post(url1, {
        deneme: "deneme"
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(response => {
    console.log(response.data);
  }).catch(function (error) {
        alert('oops');
        console.log(error);
    })
    console.log("çalıştı")
    // axios({
    //     method: 'post',
    //     url: '/get_request',
    //     data: {
    //         firstName: 'Finn',
    //         lastName: 'Williams'
    //     }
    // });
});