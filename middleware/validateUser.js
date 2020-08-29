// packages
const { isEmail, isLength } = require("validator");

// models
const User = require("../models/User.js");

// export a function w/ req, res, next as params
module.exports = async(req, res, next) => {
    // this function will need async due to the fact that it will be making requests to our database

    // extract data from req
    const email = req.body.email;
    const username = req.body.username.trim();
    const password = req.body.password;

    // validate each piece of data
    // store any feild failures in an object to use later
    let failedFeilds = {};

    // EMAIL VALIDATION
    const emailRegExp = /[\w-]+@(([\w]{2,}|[\w-]{3,})+\.)+[\w-]+/g;

    if (!isEmail(email) || !emailRegExp.test(email)) {
        failedFeilds["email"] = "Not a valid email."
    }

    // checking to see if the email is already in use
    const activeEmail = await User.findOne({ "email": email }) === null ? false : true;

    if (activeEmail) {
        failedFeilds["email"] = "Email already in use."
    }

    // USERNAME VALIDATION
    const validNameLength = isLength(username, { min: 3, max: 20 });

    if (!validNameLength) {
        failedFeilds["username"] = `Username invalid length (${username.length}); must be between 3 and 20 characters.`
    }

    // checking if username is already taken
    const activeUsername = await User.findOne({ "username": username }) === null ? false : true;

    if (activeUsername) {
        failedFeilds["username"] = "Username already in use."
    }

    // PASSWORD VALIDATION
    const validPassLength = isLength(password, { min: 8, max: 25 });

    if (!validPassLength) {
        failedFeilds["password"] = `Password must be between 8 and 25 characters; current length (${password.length}).`
    }

    let failed = [];

    const digit = /[0-9]/g;
    const digitPass = digit.test(password);
    // failed += checkPassed("digit", digitPass);
    if (!digitPass) {
        failed.push("Must contain a digit.")
    }

    const lowercase = /[a-z]/g;
    const lowercasePass = lowercase.test(password);
    // failed += checkPassed("lowercase", lowercasePass);
    if (!lowercasePass) {
        failed.push("Must contain a lowercase letter.")
    }

    const uppercase = /[A-Z]/g;
    const uppercasePass = uppercase.test(password);
    // failed += checkPassed("uppercase", uppercasePass);
    if (!uppercasePass) {
        failed.push("Must contain a uppercase letter.")
    }

    const special = /[*\.!\s@#$%\^&(){}\[\]:;<>,.?~_+-=|\\\/]/g;
    const specialPass = special.test(password);
    // failed += checkPassed("special", specialPass);
    if (!specialPass) {
        failed.push("Must contain a special character.")
    }

    if (failed.length !== 0) {
        if (failedFeilds.hasOwnProperty("password"))
            failedFeilds["password"] += " " + failed.join(" ")
        else
            failedFeilds["password"] = failed.join(" ")
    }

    // checking if the failedFeilds object has any data (errors) within and if not then continue to next method, otherwise return an error status and message
    const hasEmailErr = failedFeilds.hasOwnProperty("email");
    const hasUsernameErr = failedFeilds.hasOwnProperty("username");
    const hasPasswordErr = failedFeilds.hasOwnProperty("password");

    if (hasEmailErr || hasUsernameErr || hasPasswordErr) {

        return res.status(400).json({
            validationErr: failedFeilds
        })

    } else next()

}

// function to create errors for password validation
// function checkPassed(type, test) {

//     if (!test) return `Must contain a ${type}.`

// }