const jwt_ = require( "../middleware/token_gerenate.js")
require('dotenv').config()
const ref_token = async function ref_token(req,res) {
try {
    var jwt = req.body.jwt
    const check_jwt = jwt_.check_access_token(jwt)
    const new_jwt = jwt_.new_access_token(check_jwt.data)
    res.send(new_jwt)
   // console.log(check_jwt.data, new_jwt)
} catch (err) {
    console.log(err.message, "err reflesh-token-generate")
    res.send("JWT undefined")
    }
}

module.exports =  {ref_token }