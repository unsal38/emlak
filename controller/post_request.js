const db_crud = require ("../middleware/db_crud.js")
const token_gerenate = require( "../middleware/token_gerenate.js")
const bcrypt = require( "bcryptjs");
 function login_register(req, res) {

    try {
        const data = req.body
        // Store hash in your password DB
        const salt = bcrypt.genSaltSync(10);
        const hash_password = bcrypt.hashSync(data[3].data_element, salt);
        // Store hash in your password DB
        const data_register = {
            name: data[0].data_element,
            surname: data[1].data_element,
            email: data[2].data_element,
            password: hash_password,
            tel_number: data[4].data_element,
        }
        db_crud.add_user(data_register)
        res.send(true)
    } catch (error) { console.log(error, "post request") }

}
 function login(req, res) {
    try {
        let data = req.body
        const myPromise = db_crud.find_user(data[0])
        myPromise.then((value) => {
            if (value !== null) {
            const hash_password = value.password
                // check password
                // Load hash from your password DB
               const check_password = bcrypt.compareSync(data[1], hash_password); // true
                // Load hash from your password DB
                
                if(check_password !== true) res.send(false)
                if(check_password === true) {
                    const old_authentication = token_gerenate.check_reflesh_token(value.authentication)
                    const new_authentication = token_gerenate.new_access_token(old_authentication.data)
                    const login_user_data = new Array
                    login_user_data.push(value.authorization,new_authentication, value.name, value.surname)
                    res.send(login_user_data)
                }
                
            }else{res.send(false)}
            
        })
    } catch (error) { console.log(error, "login request") }
}
module.exports = {
    login_register,
    login
}