const { response } = require('express');
const fs = require('fs');
const path = require('path');
const factorGrammar = require("./FactorGrammar")
const recursion = require("./recursion")
const firstGrammar = require("./FirstGrammar")
const { httpError } = require('../helpers/handleError')

const getGrammar = (req, res) => {

    try {
        const data = fs.readFileSync(path.join(__dirname, '..\\..\\data\\grammar02.json'))
        const grammar = JSON.parse(data).grammar.productions
        let resGrammar = ""
        let resFacGrammar = ""
        let resFirstGrammar = ""

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
            const recursionGrammar = recursion.recursion(factorMap);
            console.log(recursionGrammar);

            // LL1
            // PRIM
            resFirstMap = firstGrammar.firstGrammar(factorMap)
            resFirstGrammar = resFirstGrammar + mapToString(resFirstMap, noTerminal)

            // SIG
            //juanes work creacion de variables constantes
            const solucionSiguientes = "";
            const primerosSig = "";
            const noTerminalPrimero = "";

            // inicio el metodo de obtencion de los siguientes
            // beginSig:(primerosSig, grammar)=>{
            //     for(int i=0;j<grammar.size();i++){

            //     }
            // }
        }

        // Res
        res.send("GRAMMAR: <br/>" + resGrammar +
            "<br/> <br/> FactorGrammar <br/><br/>"   + resFacGrammar +
            "<br/> LeftRecursion: <br/><br/>" +
            "<br/> LL1: " + 
            "<br/> <br/> PRIM: <br/><br/>" + resFirstGrammar +
            "<br/> <br/> SIG: <br/><br/>")

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