// require packages
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

// create needed global variables
const app = express();
const port = process.env.PORT || 5000;

// neccessary middleware for routes through app
app.use(morgan("dev"));
app.use(express.json());

// assign a port for the server to listen on
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});