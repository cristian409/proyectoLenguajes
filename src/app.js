// Initializations
require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
<<<<<<< HEAD
const { dbConnect } = require('./config/mongo');
const helpers = require('./app/helpers/helpers');
const bodyParser = require('body-parser');

//app configuration
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({
  extended: true
});
=======
const {dbConnect} = require('./config/mongo');
>>>>>>> b688c4ddb35d69274da414c5d9143f2979048821

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(jsonParser);
app.use(urlEncodedParser);

//routes
app.use(require('./app/routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect database
// dbConnect()

//404 handlet
app.use((req, res, next) => {
  res.status(500);
  helpers.ErrorRouta(req, res);
});

// Starting server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
