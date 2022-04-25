const fs = require('fs');
const path = require ('path');

const data = fs.readFileSync(path.join(__dirname, '..\\data\\gramaticaUno.json'));
const gramatica = JSON.parse(data).gramatica;

console.log(gramatica);


// json exportations
module.exports = gramatica;