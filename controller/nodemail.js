require('dotenv').config()
const nodemail = require('../middleware/nodemailer')


const ihtiyac_send = function (req, res) {
    const body = req.body

    const isim = body[0]
    const soyad = body[1]
    const tel_number = body[2]
    const mail = body[3]


    if (body[4] === 'null') {
        var ilan_hizmet = ''
    }else {
        var ilan_hizmet = `ilan/hizmetlerden ${body[4]} ile ilgili,`
    }
    if (body[5] === 'null') {
        var ilan = ''
    }else {
        var ilan = `${body[5]} ilanı,`
    }
     if (body[6] === 'null') {
        var hizmet = ''
    }else {
        var hizmet = `${body[6]} hizmeti,`
    }

       if (body[7] === 'null') {
        var diger = ''
    }else {
        var diger = `${body[7]} diğer konusu,`
    }
    const text = `${isim} ${soyad} isimli ${tel_number} telefon numaralı ${mail} epostası olan müşteri,${ilan_hizmet} ${ilan} ${hizmet} ${diger} hakkında bilgi almak istiyor`

    nodemail.nodemailer_sent('müşteri ihtiyacı', text)
}

const basvuru_send = function (req, res) {
    const body = req.body

    const isim = body[0]
    const soyad = body[1]
    const tel_number = body[2]
    const mail = body[3]


    const text = `${isim} ${soyad} isimli ${tel_number} telefon numaralı ${mail} epostası olan kişi iş başvurusu yapmak istiyor.`

    nodemail.nodemailer_sent('iş başvurusu', text)
}
const contact_send = function (req, res) {
    const body = req.body
    const isim = body[0]
    const email = body[1]
    const konu = body[2]
    const mesaj = body[3]
    const text = `${isim} isimli ${email} epostası olan kişi ${konu} konu hakkında ${mesaj} mesaj gönderdi`
    nodemail.nodemailer_sent('iletişim sayfası', text)
}
module.exports = { ihtiyac_send,basvuru_send, contact_send }