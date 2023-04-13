const express = require('express'); // This is used to build an application server
const app = express();
const pgp = require('pg-promise')(); // This is used to connect to the Postgres DB
const bodyParser = require('body-parser');
const session = require('express-session'); // Used to set the session object
const bcrypt = require('bcrypt'); // Used for hashing passwords
const axios = require('axios'); // Used to make HTTP requests

// Setting up the database

// Configuring the database
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port from docker-compose.yaml
  database: process.env.POSTGRES_DB, // the database name (These three are found in the .env file)
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// Making sure the database connection was successful
db.connect()
  .then(obj => {
    console.log('Database connection successful'); 
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });



app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Creating the user variable

const user = {
  username: undefined,
  password: undefined,
};

// Starting the server

app.listen(3000);
console.log('Server is listening on port 3000');