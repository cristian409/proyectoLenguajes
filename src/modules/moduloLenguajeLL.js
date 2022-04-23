const fs=require('fs');

let=data=fs.readFileSync('./data/lenguaje.json');
//console.log(data);
let lenguaje=JSON.parse(data).lenguaje;
console.log(lenguaje);
console.log(typeof(lenguaje));


