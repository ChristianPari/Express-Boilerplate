// require mongooses' schema constructor and model method
const { Schema, model } = require("mongoose");

// (if needed) require additional pkgs that will be used in Schema validation
const validator = require("validator");

// create schema by declaring a variable a new insatnce of schema
const User_Schema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error(`Email: ${value}, is not a valid email.`)
            }
        }
    },
    username: {
        required: true,
        type: String,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        required: true,
        type: String,
        minLength: 8,
        maxLength: 25,
        validate: (value) => {
            let passed = true;

            const digit = /[0-9]/g;
            const digitPass = digit.test(value);
            const lowercase = /[a-z]/g;
            const lowercasePass = lowercase.test(value);
            const uppercase = /[A-Z]/g;
            const uppercasePass = uppercase.test(value);
            const special = /[*\.!\s@#$%\^&(){}\[\]:;<>,.?~_+-=|\\\/]/g;
            const specialPass = special.test(value);

            if (digitPass !== true || lowercasePass !== true || uppercasePass !== true || specialPass !== true) {
                passed = false;
            }

            if (!passed) {
                throw new Error("Password must contain at least one of the following:\n- number\n- lowercase letter\n- uppercase letter\n- special character (*.! @#$%^&(){}[]:;<>,.?/\~_+-=|)")
            }

        }
    }
})

// use model to define it
const User = model("User", User_Schema);

module.exports = User;