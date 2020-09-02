# Express Project Boilerplate
## Description
This will be a completed setup of a Express project that I will be able to use to begin future projects
## Work Logs
### Sept 2, 2020
- Created new middlewares that handle:
    - Extraction of JWT from cookies
        - This validates that there is a token and if so decodes it
    - Authenticating Users
        - Checks if the decoded data from the token matches any users within the database, else returns error
    - Authenticating Admin Capabilities
        - Using the data from the User Authentication, checks if the Users' permissions
### Sept 1, 2020
- Updated a few files and cleaned some code, nothing major
### Aug 30, 2020
- Installed Bcrypt package to implement password encryption for when a new user document in created
    - Implemented this into the register route so when a user signs up for an account their password is encrypted when passed into the document data of the DB
- Added a "permissions" property to my User Model so that I could implement admin privileges
- Created a Login route within my User route
    - Created a middleware that verifys that the data being passed into the request body is that of a valid user from the DB and if not returns an error of "failed login"
    - When it is a valid user, they are "logged in" and a JWT (which I installed just prior to this) is created so that the user information can be translated to other paths of the server and site
### Aug 29, 2020
- Successfully integrated a User route that allows for new User documents to be created in my database
    - Route contains a middleware that validates the data being passed into the request body and if there are any errors found to then pass a response with an error status, otherwise continue onto the final method and use Mongos' create method to store a new User doc within the Users collection of the database with the request body
### Aug 28, 2020
- Did quite a bit but didn't complete a lot of it at the moment
    - I did complete the User Model which contains email, username, and password properties with their own types of validation and requirements
    - Began the creation of a userRouter which will handle requests made to the path /user
        - In the middle of creating a route for creating a new user / user sign up
    - I'm almost finished with a middleware file that will be used to validate user data from the request
        - It santizies the data and either lets all the data pass through to the final method of the request or creates errors and passes those and fails the request
    - Created a simple newError utility so I can create my own error messages with status codes
### Aug 27, 2020
- Created Home router to handle requests
    - Declared a router variable as a new instance of the Express Router Interface
    - Created a GET request for this router on its root path "/"
- Created a very simple middlware (for now)
    - Setup as an exported module and simply console logs a message to the terminal that it is a log from a middleware
- Went back into my Home Router and required the firstMiddle file
    - Placed the file call after the path within the GET request
    - Finsihed the GET request by just console logging a message that says it is a log from the router
- Within app.js
    - I required my homeRouter file so that I could then use it to handle any requests to the root route "/"
    - I used the express method "use" and express' static method to serve a static folder to the server paths
- Created a "html" folder to store HTML files
    - Created html for home and just added JavaScript and CSS tags into the bare HTML setup file
- Created a static folder to serve JavaScript and CSS
    - Created a "home" folder to store static files for home route
    - The CSS file just aligns text center
    - The JavaScript file creates a heading, a button w/ onClick and sets the body background color to lightblue. Via onClick alerts a message to user and toggles background color between light blue and light green
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
### Aug 25, 2020
- Initialized NPM within project
- Installed needed dependencies so far:
    - Express
    - Nodemon
    - Morgan
    - Mongoose
    - Dotenv
    - `WILL ADD MORE AS NEEDED`