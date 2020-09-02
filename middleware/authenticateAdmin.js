// check the request data of the user and check their admin permissions
module.exports = (req, res, next) => {

    try {

        // get admin permissions from data
        const { permissions } = req.user;

        if (permissions.admin === false) {
            throw new Error("User not admin.")
        }

        // once applicable, apply a check for level of admin needed

        next();

    } catch (err) {

        console.log("Admin Authentication Error:", err.message || err, "\n");

        return res.status(401).json({
            status: 401,
            msg: "Not Authorized"
        });

    }
}