const express = require('express'); // This is used to build an application server
const app = express();
const pgp = require('pg-promise')(); // This is used to connect to the Postgres DB
const bodyParser = require('body-parser');
const session = require('express-session'); // Used to set the session object
const bcrypt = require('bcrypt'); // Used for hashing passwords
const axios = require('axios'); // Used to make HTTP requests
app.use(express.static('All Project Code and Components'));

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
//API Integration
const auth = (req, res, next) => {
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  }
  next();
};

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('pages/home');
});
  
app.get('/login', (req, res) => {
  res.render('pages/login');
});
  
app.get('/register', (req, res) => {
  res.render('pages/register');
});
    
app.post('/register', async (req, res) => {
  const username = req.body.input_username;
  const password = req.body.input_password;
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.input_password, 10);

    // Insert username and hashed password into 'users' table
    const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    // Redirect to /login page after successful insert
    res.redirect('/login');
  } catch (error) {
    // Render the register page with an error message if the insert fails
    res.status(400).render('pages/register', { error: 'An error occurred while registering. Please try again.' });
  }
});
      
app.post('/login', async (req, res) => {
  //const { username, password } = req.body;
  const username = req.body.input_username;
  const password = req.body.input_password;

  try {
    // Find the user with the given username
    const [user] = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    // If user is not found, redirect to register page
    if (!user) {
      res.redirect('/register');
      return;
    }

    // Compare the entered password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // If the password is incorrect, throw an error
      throw new Error('Incorrect username or password.');
    }

    // Save the user in the session
    req.session.user = user;
    req.session.save();

    // Redirect to the discover page after setting the session
    res.redirect('/discover');
  } catch (error) {
    // Send an appropriate error message to the user and render the login page
    res.status(401).render('pages/login', { error: error.message });
  }
});

app.get("/discover", (req, res) => {
  const searchTerm = req.query.q || "Baseball Cards"; // default search term is "Baseball Cards"
  axios.get(`https://svcs.ebay.com/services/search/FindingService/v1?Operation-Name=findItemsByKeywords&Service-Version=1.0.0&Security-AppName=AndrewZi-CasaCata-PRD-53ab496b1-879c446f&Response-Data-Format=JSON&REST-Payload&keywords=${encodeURIComponent(searchTerm)}`)
    .then(results => {
      const products = results.data.findItemsByKeywordsResponse[0].searchResult[0].item;
      const items = products.map(product => {
        const name = product.title[0];
        const image = product.galleryURL[0];
        const id = product.itemId[0];
        const price = product.sellingStatus[0].currentPrice[0].__value__;
        const url = product.viewItemURL[0];
        return { name, image, id, price, url };
      });
      res.render("pages/discover", { items });
    })
    .catch(error => {
      res.send(error);
    });
});
  app.get('/discover', (req, res) => {
    res.render('pages/discover');
  });

// Creating the user variable


// Starting the server

app.listen(3000);
console.log('Server is listening on port 3000');