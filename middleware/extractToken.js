// packages
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

// method, takes the token from the cookie header
module.exports = (req, res, next) => {

    // extracting the token property from the browsers' cookies
    const { token } = cookie.parse(req.headers.cookie || "");

    if (token !== "") {

        // secret key to verify jwt
        const secret = process.env.JWT_SECRET;

        // decoded jwt payload, if exists
        const decodedData = jwt.verify(token, secret);

        // pass the data with the request as a property to be accessed and used in the following method
        req.data = decodedData;

        next();

    } else {

        console.log("Extract Token Error: No Token Found");

        // if there was no token found then return an error w/ not authorized
        return res.status(404).json({
            status: 404,
            msg: "Not Authorized",
            error: "No Token Found"
        });

    }



}