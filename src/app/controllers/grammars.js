const fs = require('fs');
const path = require('path');
const { httpError } = require('../helpers/handleError')

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..\\..\\data\\grammar03.json'));
        const grammar = JSON.parse(data).grammar.productions;
        let factors;
        let commonFactor;

        grammar.forEach(element => {
            productions = element.split('|')
        });

        // factorGrammar
        factors = factorGrammar(productions)
        commonFactor = factors[0]

        while (factors[1].localeCompare('') != 0) {
            factors = factorGrammar(factors[1].split("|"))
            commonFactor = commonFactor + "|" + factors[0]
            console.log(factors[0])
        }

        // leftRecursion


        // LL1
        // PRIM


        // SIG



        // Res
        res.send("GRAMMAR: <br/>" + grammar +
            "<br/> <br/> FactorGrammar: <br/>" + commonFactor + 
            "<br/> <br/> LeftRecursion: <br/>" + 
            "<br/> <br/> LL1: <br/>" + 
            "<br/> <br/> PRIM: <br/>" + 
            "<br/> <br/> SIG: <br/>")

    } catch (e) {
        httpError(res, e)
    }
}

function factorGrammar(productions) {

    console.log("production " + productions)
    const firstChar = productions[0][0]
    const arrayFactor = []
    arrayFactor.push(productions[0].slice(1))
    let noFactor = ""
    let commonProduction = false
    let commonFactor = ""

    for (let i = 1; i < productions.length; i++) {

        console.log(productions)
        let production = productions[i]
        if (firstChar.localeCompare(production[0]) == 0) {
            commonProduction = true
            production = production.slice(1)
            arrayFactor.push(production)
        } else {
            if (noFactor.localeCompare("") == 0) {
                noFactor = noFactor.concat(production)
            } else {
                noFactor = noFactor.concat("|" + production)
            }
        }
    }

    if (commonProduction == true) {

        factors = factorGrammar(arrayFactor)
        commonFactor = firstChar + "(" + factors[0]

        while (factors[1].localeCompare('') != 0) {
            console.log("factor1: " + factors[1])
            factors = factorGrammar(factors[1].split("|"))
            commonFactor = commonFactor + "|" + factors[0]
        }
        return [commonFactor + ")", noFactor]
    } else {
        if (noFactor.localeCompare('') != 0) {
            console.log("production: " + productions[0] + " nofactor: " + noFactor)
            return [productions[0], noFactor]
        } else {
            return [productions[0], '']
        }
        
    }

}

module.exports = { getGrammar }