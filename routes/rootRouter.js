// declare router varaible from epxress' Router interface
const router = require("express").Router();

// delcare middlewares
const firstMiddle = require("../middleware/firstMiddle");

// create routes that will be used depending on path and HTTP request
router.get(
    "/",
    firstMiddle,
    (req, res) => {
        console.log("\n- This is a route console log -");
    }
)

module.exports = router;