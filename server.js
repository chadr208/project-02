// Import dependencies
// Provides functions to send and recieve server requests on the designated port
const express = require('express');
// Provides utilities for working with file and directory paths
// const path = require('path');

const session = require('express-session');

const { engine } = require('express-handlebars');

// Define Variables 
// Defining express as a top-level function to be re-used each time a request is made or the port is being listened to
const app = express();
const sequelize = require('./config/connection');
const routes = require('./routes')


// Sets the PORT variable to either the value of the PORT environment variable, if it is set, or 3001 if it is not set. 
// This is useful when deploying the application to a hosting platform, as the hosting platform may specify the port that the application should listen on through an environment variable.
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  console.log(req.session)
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('home');
});

app.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

app.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Initialize server
app.use(routes)

// When this file is ran, express listens for connections to our designated port address, and returns a node http.Server with this application as its callback
sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
})
