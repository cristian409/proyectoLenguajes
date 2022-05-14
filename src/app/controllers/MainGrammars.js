const { response } = require('express');
const fs = require('fs');
const path = require('path');
const factorGrammar = require("./FactorGrammar")
const leftRecursion = require("./LeftRecursion")
const firstGrammar = require("./FirstGrammar")
const productionSet = require("./ProductionSet")
const followingGrammar=require("./FollowingGrammar")
const { httpError } = require('../helpers/handleError')

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..\\..\\data\\grammar04.json'))
        const grammar = JSON.parse(data).grammar.productions
        let resGrammar = ""
        let resFacGrammar = ""
        let resFirstGrammar = ""
        let resLeftRecursion  = ""
        let resPredictionSet = ""

        for (const property in grammar) {

            initialGrammar = grammar[property].production
            noTerminal = grammar[property].id

            resGrammar = resGrammar + "<br/>" + noTerminal + " -> " + initialGrammar

            productions = initialGrammar.split('|')
            // factorGrammar
            let factorMap = new Map()
            resFacGrammarMap = factorGrammar.factorGrammar("", productions, factorMap, noTerminal)

           
            if (!(resFacGrammarMap instanceof Map)){
                if(!(resFacGrammarMap instanceof Array)){
                    factorMap.set(noTerminal, resFacGrammarMap)
                } else {
                    factorMap.set(noTerminal, resFacGrammarMap.join())
                }
                
            } else {
                factorMap = resFacGrammarMap
            }
            resFacGrammar = resFacGrammar + mapToString(factorMap, noTerminal)

            // leftRecursion
            console.log(factorMap)
            const recursionGrammar = leftRecursion.LeftRecursion(factorMap);
            resLeftRecursion = resLeftRecursion + mapToString(recursionGrammar, noTerminal)

            // LL1
            // PRIM
            resFirstMap = firstGrammar.firstGrammar(recursionGrammar)
            resFirstGrammar = resFirstGrammar + mapToString(resFirstMap, noTerminal)

            // SIG
            //llamado funcion siguientes.
            resfollowGrammar=followingGrammar.siguientes(recursionGrammar)


            // inicio el metodo de obtencion de los siguientes
            

            //CONJUNTO PREDICCION
            resProductionSetMap = productionSet.productionSet(recursionGrammar,resFirstMap);
            resPredictionSet = resPredictionSet + mapToString(resProductionSetMap, noTerminal)
        }

        // Res
        res.send("GRAMMAR: <br/>" + resGrammar +
            "<br/> <br/> FactorGrammar <br/><br/>"   + resFacGrammar +
            "<br/> LeftRecursion: <br/><br/>" + resLeftRecursion +
            "<br/> LL1: " + 
            "<br/> <br/> PRIM: <br/><br/>" + resFirstGrammar +
            "<br/> <br/> SIG: <br/><br/>" +
            "<br/> <br/> CP: <br/><br/>" + resPredictionSet)

    } catch (e) {
        httpError(res, e)
    }
}

/*Formatea el mapa de las producciones en un string 
organizandolo alfabeticamente pero iniciando por la produccion inicial*/
function mapToString(map, noTerminal) {

    let stringMap = ""
    
    map = new Map([...map.entries()].sort())

    for (let [key, value] of map.entries()) {

        if (key.localeCompare(noTerminal) != 0) {
            stringMap = stringMap + key + "' -> " + value + "<br/>"
        } else {
            stringMap = key + " -> " + value + "<br/>" + stringMap
        }
    }
    return stringMap
}

module.exports = { getGrammar }