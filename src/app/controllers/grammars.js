const fs = require('fs');
const path = require('path');
const { httpError } = require('../helpers/handleError')

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..\\..\\data\\grammar02.json'));
        const grammar = JSON.parse(data).grammar.productions;
        console.log(grammar)

        grammar.production.forEach(element => {
            productions = element.split('|')
            return productions;
        });

        // factorGrammar
        const factorMap = new Map()
        resMap = factorGrammar("", productions, factorMap, grammar.id)
        
        // leftRecursion


        // LL1
        // PRIM


        // SIG
        //juanes work creacion de variables constantes
        const solucionSiguientes="";
        const primerosSig="";
        const noTerminalPrimero="";

        // inicio el metodo de obtencion de los siguientes
       // beginSig:(primerosSig, grammar)=>{
       //     for(int i=0;j<grammar.size();i++){

       //     }
       // }




        // Res
        res.send("GRAMMAR: <br/>" + grammar.production +
            "<br/> <br/> FactorGrammar <br/>" + mapToString(resMap, grammar.id) +
            "<br/> <br/> LeftRecursion: <br/>" +
            "<br/> <br/> LL1: <br/>" +
            "<br/> <br/> PRIM: <br/>" +
            "<br/> <br/> SIG: <br/>")

    } catch (e) {
        httpError(res, e)
    }
}

/*Formatea el mapa de las producciones en un string 
organizandolo alfabeticamente pero iniciando por la produccion inicial*/
function mapToString(map, initial) {

    let stringMap = ""
    map = new Map([...map.entries()].sort())

    for (let [key, value] of map.entries()) {

        if (key.localeCompare(initial) != 0) {
            stringMap = stringMap + key + " -> " + value + "<br/>"
        } else {
            stringMap = key + " -> " + value + "<br/>" + stringMap
        }
    }
    return stringMap
}

function factorGrammar(alreadyFac, productions, factorMap, factorFather) {

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

        factorGrammar(alreadyFac, quotientsArray, factorMap, factor)
        alreadyFac = alreadyFac + factor + factor + "'"
        factorMap.set(factorFather, alreadyFac)
        if (noFactor != "") {
            alreadyFac = alreadyFac + "|" + factorGrammar("", noFactor.split("|"), factorMap, factorFather)
            factorMap.set(factorFather, alreadyFac)
            return alreadyFac, factorMap
        }
        return alreadyFac
    } else {
        if (noFactor.localeCompare('') != 0) {

            alreadyFac = factor + "|" + factorGrammar(alreadyFac, noFactor.split("|"), factorMap, factorFather)
            factorMap.set(factorFather, alreadyFac)
            return alreadyFac
        } else {
            return productions
        }
    }
}

module.exports = { getGrammar }