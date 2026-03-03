import jwt from "jsonwebtoken"
import 'dotenv/config'
///// YENİ TOKEN OLUŞTURMA ///// 


function new_reflesh_token(data) {
    return jwt.sign({data}, process.env.reflesh_token, {expiresIn: "365d"})
}





function new_token(data, secret) {
    return jwt.sign({data}, secret, {expiresIn: "180d"})
}



///// KİŞİ PAROLASI İÇİN KONTROL ///// 6 ay
const check_access_token = function check_access_token(token) {
    return jwt.verify(token, process.env.reflesh_token)
}
/////SUNUCUDAKİ REFLESH TOKEN KONTROL ///// 12 ay
const check_reflesh_token = function check_reflesh_token(params) {
    return jwt.verify(token, process.env.reflesh_token)
}


export default {new_reflesh_token, check_reflesh_token }