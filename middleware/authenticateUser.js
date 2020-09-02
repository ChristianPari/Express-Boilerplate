// models
const User = require("../models/User");

// authenticate the data from the token (was extracted in ./extractToken.js)
module.exports = async(req, res, next) => {

    // "try" user ID is valid length, user exists in DB
    try {

        // extract the id from the users data
        const { id } = req.data;

        if (id.length !== 24) {
            throw new Error("ID is an invalid length.")
        }

        // query, projection for Mongos' findOne method
        const query = { "_id": id };
        const projection = { "password": 0, "_v": 0 };
        const userData = await User.findOne(query, projection);

        if (userData === null) {
            throw new Error("User doesn't exist.")
        }

        console.log("User:", userData);

        // if user exists then continue to next method
        req.user = userData;

        next();

    } catch (err) {

        // "catch" any errors thrown from above code
        // return 500 not authorized
        console.log("User Authentication Error:", err.messgae || err, "\n");

        return res.status(401).json({
            status: 401,
            msg: "Not Authorized"
        })

    }

}