/**
 * Metodo que se utiliza para crear un objeto Mapa
 * @param {*} grammarJson El objeto Json recibido de la informacion del index.html
 * @returns El objeto Mapa
 */
exports.grammarMap = (grammarJson) => {
    const factorMap = new Map()
    const grammar = JSON.parse(grammarJson).grammar;
    for (const g in grammar) {
        factorMap.set(grammar[g].noTerminal, grammar[g].production);
    }
    
    return factorMap;
}
/**
 * Metodo que se utiliza para crear un objeto json
 * @param {*} g El obejto mapa
 * @returns la informacion convertida en json para el index.html
 */
exports.grammarJson = (g) => {
    const newGrammar = [];
    for (const [key, value] of g) {
        newGrammar.push({ noTerminal: key, productions: value });
    }
    return newGrammar;
}

/**
 * Metodo que se utiliza para renderizar un html cuando
 * no se encuentra la ruta
 * @param {*} req 
 * @param {*} res 
 */
exports.ErrorRouta = (req, res) => {
    res.render("../views/404.html");
}