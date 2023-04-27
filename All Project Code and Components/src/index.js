const express = require('express'); // This is used to build an application server
const app = express();
const pgp = require('pg-promise')(); // This is used to connect to the Postgres DB
const bodyParser = require('body-parser');
const session = require('express-session'); // Used to set the session object
const bcrypt = require('bcrypt'); // Used for hashing passwords
const axios = require('axios'); // Used to make HTTP requests
app.use(express.static('resources')); //Setting default path for static files

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
app.use(express.static('resources'))

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
  userid: undefined,
  username: undefined,
  password: undefined,
};

// Allow the use of static files, such as images. 
// An image path will be defined as img/<FILENAME>
app.use(express.static('resources'));


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
    res.redirect( '/login' );
  } catch (error) {
    // Render the register page with an error message if the insert fails
    res.locals.message = "Registration Failed. Please enter a unique username.";
    res.status(400).render('pages/register', { error: 'An error occurred while registering. Please try again.' });
  }
});

app.post('/login', async (req, res) => {
  const username = req.body.input_username;
  const password = req.body.input_password;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    if (!user) {
      res.redirect('/register');
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Incorrect username or password.');
    }

    req.session.user = user;
    req.session.userid = user.userid; // Set the userId property in the session object
    req.session.save();
  

    res.redirect('/discover');
  } catch (error) {
    // Send an appropriate error message to the user and render the login page
    res.locals.message = "Incorrect username or password.";
    res.status(401).render('pages/login', { error: error.message, message: "Incorrect username or password" });
  }
});

app.get("/discover", (req, res) => {
  const userid = req.session.userid;
  if (!userid) {
    res.locals.message = "Please log in to access these features. If you are new, please register.";
    res.redirect("/login");
    return;
  }
  else{res.locals.message = "Welcome to the Discover Page!"};
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
      res.render("pages/discover", { items, searchTerm });
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/watchlist', async (req, res) => {
  const userid = req.session.userid;
  if (!userid) {
    res.locals.message = "Please log in to access these features. If you are new, please register.";
    res.redirect("/login");
    return;
  }

  const watchlist = await db.query("SELECT * FROM watchlist WHERE userid = $1 ORDER BY id", [userid]);
  res.render('pages/watchlist', { watchlist, message: req.session.message });
  req.session.message = undefined; // clear the message
});

app.post("/watchlist", async (req, res) => {
  const userid = req.session.userid;
  const { productId, itemImage, itemName, itemPrice, itemUrl } = req.body;
  const watchPrice = req.body.watchPrice || (itemPrice * 0.98); // Set watchPrice to 2% less than itemPrice if not specified
  if (!userid) {
    res.redirect("/login");
    return;
  }
  try {
    await db.query(
      "INSERT INTO watchlist (userid, productId, itemImage, itemName, itemPrice, itemUrl, watchPrice) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [userid, productId, itemImage, itemName, itemPrice, itemUrl, watchPrice]
    );
    res.redirect("/watchlist");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post('/watchlist/delete', async (req, res) => {
  const itemId = req.body.itemId;
  const sql = `DELETE FROM watchlist WHERE id = ${itemId}`;
  try {
    const result = await db.query(sql);
    console.log(`Item with ID ${itemId} removed from watchlist.`);
    res.locals.message = 'Removed item from Watch List';
    res.redirect('/watchlist');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error removing item from watchlist');
  }
});

app.post("/watchlist/update-price", async (req, res) => {
  const userid = req.session.userid;
  if (!userid) {
    req.session.message = "Please log in to access these features. If you are new, please register.";
    res.redirect("/login");
    return;
  }
  else{
    req.session.message = "Watchlist Price Updated!";
    res.redirect('/watchlist');
  };
  const itemId = req.body.itemId;
  const watchPrice = req.body.watchPrice;
  try {
    await db.query(
      "UPDATE watchlist SET watchprice = $1 WHERE id = $2",
      [watchPrice, itemId]
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/notifications', async (req, res) => {
  const userid = req.session.userid;
  if (!userid) {
    res.locals.message = "Please log in to access these features. If you are new, please register.";
    res.redirect("/login");
    return;
  }
  try{
    const watchlistMeet = await db.query(
      "SELECT * FROM watchlist WHERE userid = $1 AND itemPrice < watchPrice;",
      [userid]
    );
    const watchlistLow = await db.query(
      "SELECT * FROM watchlist WHERE userid = $1  AND itemPrice = lowPrice;",
      [userid]
    );
    res.render('pages/notifications', { watchlistMeet, watchlistLow });
  } catch (err) {
    res.status(500).send(error.message);
  }
});

app.get ("/logout", (req, res) => {
  if (!req.session.userid) {
    res.locals.message = 'You were not logged in.'; // If the user was not logged in, this message will display
  } else {
    res.locals.message = 'Logged out Successfully.'; // Otherwise they have logged out successfully
  }

  user.username = undefined;
  user.password = undefined;
  user.userid = undefined; // Resetting the session variable
  req.session.userid = undefined;
  req.session.save();
  
  res.render("pages/login"); // Redirection the user to the login page
});

//Test route for lab 11
app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});


// Starting the server

//module.exports = app.listen(3000); //For testing using command = npm run testandrun in docker-compose.yaml
app.listen(3000); //For running the application using command = npm start in docker-compose.yaml
console.log('Server is listening on port 3000');