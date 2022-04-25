const fs = require('fs');
const path = require('path');
const { httpError } = require('../helpers/handleError')

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..\\..\\data\\gramaticaUno.json'));
        const gramatica = JSON.parse(data).gramatica;
        res.send(gramatica)

    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { getGrammar }