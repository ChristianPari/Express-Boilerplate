# Express Project Boilerplate
## Description
This will be a completed setup of a Express project that I will be able to use to begin future projects
## Work Logs
### Aug 25, 2020
- Initialized NPM within project
- Installed needed dependencies so far:
    - Express
    - Nodemon
    - Morgan
    - Mongoose
    - Dotenv
    - `WILL ADD MORE AS NEEDED`
### Aug 26, 2020
- Created main app file (app.js)
    - Required necessary packages needed at this moment
    - Declared app variable which is my instance of express, and accessed my env file to get my port number within a variable
    - Declared necessary middleware that will be used on all routes; morgan to see requests in the code terminal, and express.json() so my app will recoginize that the Request Object is a JSON Object
    - Created listen method for my app and assigned my port, along with logging to the console a message to let myself know that the server is listening on the correct port/ to know what port
- Created Mongoose connection process
    - Created a new file to contain a function that will connect the server to the database and then will be exported so that I can use it within my app.js file
    - Function contains connect() and connection.on() methods to handle messages for the connection process; logs to terminal "connecting", "connected", or "errors"
    - Declared a new variable within app.js that is assigned the require method with the file "dbConnect.js" as the path and then I call the this variable to run the exported file which runs the database connection function