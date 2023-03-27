// Import dependencies
// Provides functions to send and recieve server requests on the designated port
const express = require('express');
// Provides utilities for working with file and directory paths
const path = require('path');

// Define Variables 
// Defining express as a top-level function to be re-used each time a request is made or the port is being listened to
const app = express();
const sequelize = require('./config/connection');
const routes = require('./routes')


// Sets the PORT variable to either the value of the PORT environment variable, if it is set, or 3001 if it is not set. 
// This is useful when deploying the application to a hosting platform, as the hosting platform may specify the port that the application should listen on through an environment variable.
const PORT = process.env.PORT || 3001;

// Initialize server
app.use(routes)
// GET Route for Homepage, '/' is the default filepath
app.get('/', (req, res) => 
  // The response for sending a get request to the homepage is to receive our index.html file
  res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/', (req, res) => {
  res.render('index', { title: 'EZ Restaurant'})
})
 
// When this file is ran, express listens for connections to our designated port address, and returns a node http.Server with this application as its callback
sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
})
