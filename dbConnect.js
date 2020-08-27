// reuire mongoose
const mongoose = require("mongoose");

// access database URI from env file
const dbURI = process.env.DB_URI;

// variable to use database name in "on cennected" method
const dbName = process.env.DB_NAME;

// deprecated object to pass into the mongoose connect method
const depObj = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}

module.exports = () => {

    // runs when server fully connects to database or errors on attempt
    mongoose.connect(dbURI, depObj, (err) => {

        if (err)
            console.log(`\n* Server Couldn't Connect to Database:\n${err} *`);
        else
            console.log(`\n* Connection Established to: ${dbName} *`);

    })

    // runs if there is an error when attemping to connect
    mongoose.connection.on("error", (err) => {
        console.log(`\n* Error Attemoting to Connect:\n${err} *`);
    })

    // runs when server to database connection is initiated
    mongoose.connection.on("connected", () => {
        console.log("\n* Connecting to Database... *");
    })

}