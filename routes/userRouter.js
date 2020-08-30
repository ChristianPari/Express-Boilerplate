// require needed packages
const router = require("express").Router();
const bcrypt = require("bcrypt");

// needed Models
const User = require("../models/User");

// declare middlewares
const validateUser = require("../middleware/validateUser");

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

module.exports = router;