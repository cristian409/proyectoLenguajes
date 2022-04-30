const fs = require('fs');
const path = require('path');
const { httpError } = require('../helpers/handleError')

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..\\..\\data\\grammar01.json'));
        const grammar = JSON.parse(data).grammar.productions;

        grammar.forEach(element => {
            productions = element.split('|')
        });
        console.log(productions)

        // factorGrammar
        factors = factorGrammar("", productions)

        // leftRecursion


        // LL1
        // PRIM


        // SIG



        // Res
        res.send("GRAMMAR: <br/>" + grammar +
            "<br/> <br/> FactorGrammar: <br/>" + factors +
            "<br/> <br/> LeftRecursion: <br/>" +
            "<br/> <br/> LL1: <br/>" +
            "<br/> <br/> PRIM: <br/>" +
            "<br/> <br/> SIG: <br/>")

    } catch (e) {
        httpError(res, e)
    }
}

function factorGrammar(alreadyFac, productions) {


    const factorArray = []
    const quotientsArray = []
    let noFactor = ""
    let quotientsExist = false
    let factor = ""

    let totalFactor = 0
    let count = 0

    for (let i = 0; i < productions.length; i++) {
        factor = productions[0][i]
        for (let j = 1; j < productions.length; j++) {
            if (productions[j].length > i) {
                if (productions[j][i].localeCompare(factor) == 0) {
                    count = count + 1
                }
            }
        }

        if (productions.length <= 2 && count == 0 && totalFactor == 0) {

            factor = productions[0]
            if (factorArray.indexOf(factor) === -1) {
                factorArray.push(factor)
            }
            break
        }

        if (totalFactor == 0 || totalFactor == count) {

            if (count == 0) {

                factor = productions[0]
                factorArray.push(factor)
                break

            } else {

                if (factorArray.indexOf(factor) === -1) {
                    factorArray.push(factor)

                    totalFactor = count
                    count = 0
                }
            }
        }
    }

    factor = factorArray.join('')
    quotientsArray.push(productions[0].slice(factor.length))


    for (let i = 1; i < productions.length; i++) {

        if (productions[i].startsWith(factor)) {

            quotientsExist = true
            quotientsArray.push(productions[i].slice(factor.length))
        } else {
            if (noFactor.localeCompare("") == 0) {
                noFactor = noFactor.concat(productions[i])
            } else {
                noFactor = noFactor.concat("|" + productions[i])
            }
        }
    }

    if (quotientsExist) {
        
        const factorMap = new Map()
        factorMap.set(factor, quotientsArray)
        console.log(factorMap)
        
        alreadyFac = alreadyFac + factor + "(" + factorGrammar(alreadyFac, quotientsArray) + ")"
        if (noFactor != "") {
            alreadyFac = alreadyFac + " | " + factorGrammar("", noFactor.split("|"))
        }
        return alreadyFac
    } else {
        if (noFactor.localeCompare('') != 0) {
            alreadyFac = alreadyFac + factor + " | " + factorGrammar(alreadyFac, noFactor.split("|"))
            return alreadyFac
        } else {
            return productions
        }
    }
}

module.exports = { getGrammar }