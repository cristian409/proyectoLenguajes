const { response } = require('express');
const fs = require('fs');
const path = require('path');
const utility = require("./Utility/Utility")
const factorGrammar = require("./LL1/FactorGrammar")
const leftRecursion = require("./LL1/LeftRecursion")
const firstGrammar = require("./LL1/FirstGrammar")
const productionSet = require("./LL1/ProductionSet")
const followingGrammar = require("./LL1/FollowingGrammar")
const LR0 = require('./LR0/LR0');
const { httpError } = require('../helpers/handleError');

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..//..//data//grammar05.json'))
        const grammar = JSON.parse(data).grammar.productions
        const initial = JSON.parse(data).grammar.Initial
        let resGrammar = ""
        let resFacGrammar = ""
        let resFirstGrammar = ""
        let resLeftRecursion = ""
        let resPredictionSet = ""
        let resLR0 = ""
        let grammarMap = new Map()

        for (const property in grammar) {

            initialGrammar = grammar[property].production
            noTerminal = grammar[property].id

            buildMapGrammar(noTerminal, initialGrammar, grammarMap)

            productions = initialGrammar.split('|')
            // factorGrammar
            let factorMap = new Map()
            resFacGrammarMap = factorGrammar.factorGrammar("", productions, factorMap, noTerminal)


            if (!(resFacGrammarMap instanceof Map)) {
                if (!(resFacGrammarMap instanceof Array)) {
                    factorMap.set(noTerminal, resFacGrammarMap)
                } else {
                    factorMap.set(noTerminal, resFacGrammarMap.join())
                }

            } else {
                factorMap = resFacGrammarMap
            }
            resFacGrammar = resFacGrammar + utility.mapToString(factorMap, noTerminal)

            // leftRecursion
            const recursionGrammar = leftRecursion.LeftRecursion(factorMap);
            resLeftRecursion = resLeftRecursion + utility.mapToString(recursionGrammar, noTerminal)

            // LL1
            // PRIM
            resFirstMap = firstGrammar.firstGrammar(recursionGrammar)
            resFirstGrammar = resFirstGrammar + utility.mapToString(resFirstMap, noTerminal)

            // SIG
            //llamado funcion siguientes.
            resfollowGrammar = followingGrammar.siguientes(recursionGrammar)

            // inicio el metodo de obtencion de los siguientes


            //CONJUNTO PREDICCION
            resProductionSetMap = productionSet.productionSet(recursionGrammar, resFirstMap);
            resPredictionSet = resPredictionSet + utility.mapToString(resProductionSetMap, noTerminal)
        }


        resGrammar = utility.mapToString(grammarMap, initial)

        resLR0 = LR0.lr0(grammarMap, initial)

        // Response
        res.send("GRAMMAR: <br/> <br/>" + resGrammar +
            "FactorGrammar <br/><br/>" + resFacGrammar +
            "LeftRecursion: <br/><br/>" + resLeftRecursion +
            "LL1: <br/>" +
            "<br/> PRIM: <br/><br/>" + resFirstGrammar +
            "SIG: <br/><br/>" +
            "CP: <br/><br/>" + resPredictionSet +
            "LR0: <br/> <br/>" + resLR0)

    } catch (e) {
        httpError(res, e)
    }
}



function buildMapGrammar(noTerminal, productions, grammarMap) {
    grammarMap.set(noTerminal, productions)
    return grammarMap
}

module.exports = { getGrammar }