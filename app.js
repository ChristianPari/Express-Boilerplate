// require packages
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

// create needed global variables
const app = express();
const port = process.env.PORT || 5000;

// mongo db connection function file
const connectDB = require("./dbConnect.js");

// router files used for route handling
const rootRouter = require("./routes/rootRouter");

// route handling
app.use("/", rootRouter);

// neccessary middleware for routes through app
app.use(morgan("dev"));
app.use(express.json());

// calling function retrieved from dbConnect to connect to my database
connectDB();

// assign a port for the server to listen on
app.listen(port, () => {
    console.log(`\n* Listening on port: ${port} *`);
});