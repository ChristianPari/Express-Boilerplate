/* MIDDLEWARE DESCRIPTION

* will be used to verify the data that the user is trying to login with
* if matches a user within DB then continues to next method
* if no matches are found then the server responds with 500 and that no user exists

*/

// packages
const bcrypt = require("bcrypt");
const validator = require("validator");

// models
const User = require("../models/User");

// function that exports w/ req, res, and next params
module.exports = async(req, res, next) => {
    // this function will need async due to the fact that it will be making requests to our database

    // dectructure request body
    const { email_username, password } = req.body;

    if (email_username === undefined || email_username.trim() === "") {
        console.log("\nNo Email or Username entered (checkLogin)");
        return failedLogin(req, res);
    }

    if (password === undefined || password.trim() === "") {
        console.log("\nNo Password entered (checkLogin)");
        return failedLogin(req, res);
    }

    // EMAIL / USERNAME CHECK

    // will assign a key of email or username, will be used to find User in DB
    const dbSearch = (validator.isEmail(email_username)) ? { "email": email_username } : { "username": email_username };

    const user = await User.findOne(dbSearch);

    if (user === null) {
        console.log("\nUser Doesn't Exist (checkLogin)");
        return failedLogin(req, res);
    }

    // PASSWORD CHECK

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
        console.log("\nPassword Doesn't Match DB User (checkLogin)");
        return failedLogin(req, res);
    }

    // method will only get this far if all above passes

    // assigning data from the user to the request so that it can be included in the JWT payload created in the next method
    req.id = user._id;

    next();

}

function failedLogin(req, res) {
    return res.status(409).json({
        msg: "Login Failed"
    })
}