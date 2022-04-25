// Initializations
require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const {dbConnect} = require('./config/mongo')

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//routes
app.use(require('./app/routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect database
dbConnect()
// Starting server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
