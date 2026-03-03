
import token_jwt from "../middleware/token_gerenate.js"
import cookieParser from "cookie-parser"
const check_user = function (req, res, next) {
    try {
        const cookie_data = req.cookies
        const check_null = cookie_data.autjwt
            if (check_null !== undefined) {
                const cookie_aut_jwt = req.cookies.autjwt
                const cookie_aut = req.cookies.aut
                const user_data = token_jwt.check_access_token(cookie_aut_jwt)
                var data =  [user_data, cookie_aut]
            }else if(check_null === undefined) {var data = null}

        req.user = data
        next()
    } catch (err) {
        if (err) {
            // req.cookies.remove 
            console.log(err.message, "check users")
            next()
        }
    }
}
export default { check_user }