module.exports = (req, res, next) => {

    console.log("\n- This is a middleware console log -");

    next()

}