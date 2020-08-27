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

        res.send("Welcome to my App");
    }
)

router.get(
    "/home",
    (req, res) => {
        const path = process.cwd() + "/html/home.html";
        res.sendFile(path, err => {

            if (err) {
                res.status(500).json({
                    error: err.message || err
                })
            }

        })
    }
)

module.exports = router;