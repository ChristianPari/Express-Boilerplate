// require needed packages
const router = require("express").Router();

// needed Models
const User = require("../models/User");

// declare middlewares
const validateUser = require("../middleware/validateUser");

// route handling

// @desc create new user, stores in Users collection in DB
// @path (server origin)/user/new
// @access public
router.post(
    "/new",
    validateUser,
    async(req, res) => {

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
)

module.exports = router;