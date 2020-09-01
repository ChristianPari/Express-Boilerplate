// require needed packages
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// env Variables
const secret = process.env.SECRET;

// needed Models
const User = require("../models/User");

// declare middlewares
const validateUser = require("../middleware/validateUser");
const checkLogin = require("../middleware/checkLogin");

// ROUTE HANDLING

// @desc create new user, stores in Users collection in DB
// @path POST - (server origin)/user/register
// @access public
router.post(
    "/register",
    validateUser,
    async(req, res) => {

        // password encrpytion
        req.body.password = await bcrypt.hash(req.body.password, 10);

        try {

            const newUser = await User.create(req.body);

            return res.status(201).json({
                status: 201,
                msg: "Succesful User Creation",
                new_user: newUser
            });


        } catch (err) {

            return res.status(500).json({
                error: err.message || err
            })

        }

    }
);

// @desc user login route
// @path PUT - (server origin)/user/login
// @access public
router.put(
    "/login",
    checkLogin,
    (req, res) => {

        try {

            const token = jwt.sign({ id: req.id }, secret, { "expiresIn": "1min" });

            return res.status(200).json({
                status: 200,
                msg: "Succesful Login",
                user_token: token
            });

        } catch (err) {

            return res.status(500).json({
                status: 500,
                msg: err.message || err
            });

        }

    }
)


module.exports = router;