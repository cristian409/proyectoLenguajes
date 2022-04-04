const express = require('express');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000)

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

// Starting server
app.listen(app.get('port'), () => {

    console.log(`Server on port ${app.get('port')}`);
});