const fs = require('fs');

const data = fs.readFileSync(__dirname + '/data/gramaticaUno.json');
const gramatica = JSON.parse(data).gramatica;


// json exportations
module.exports = gramatica;