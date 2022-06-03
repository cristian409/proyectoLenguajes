<<<<<<< HEAD
const fs = require('fs');
const path = require('path');
const factorGrammar = require("./FactorGrammar")
const leftRecursion = require("./LeftRecursion")
const firstGrammar = require("./FirstGrammar")
const productionSet = require("./ProductionSet")
=======
<<<<<<< HEAD
const { response } = require("express");
const fs = require("fs");
const path = require("path");
const factorGrammar = require("./FactorGrammar");
const leftRecursion = require("./LeftRecursion");
const firstGrammar = require("./FirstGrammar");
const productionSet = require("./ProductionSet");
const followingGrammar = require("./following");
const { httpError } = require("../helpers/handleError");
const following = require("./following");
=======
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
>>>>>>> 2fda6287bf13ebff619366cfa98e0df7eb403630
>>>>>>> b688c4ddb35d69274da414c5d9143f2979048821

const getGrammar = (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "..\\..\\data\\grammar04.json")
    );
    const grammar = JSON.parse(data).grammar.productions;
    let resGrammar = "";
    let resFacGrammar = "";
    let resFirstGrammar = "";
    let resLeftRecursion = "";
    let resFollowGrammar = "";
    let resPredictionSet = "";
    let counter = 0;

<<<<<<< HEAD
    for (const property in grammar) {
      initialGrammar = grammar[property].production;
      noTerminal = grammar[property].id;
=======
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
>>>>>>> 2fda6287bf13ebff619366cfa98e0df7eb403630

      resGrammar = resGrammar + "<br/>" + noTerminal + " -> " + initialGrammar;

      productions = initialGrammar.split("|");
      // factorGrammar
      let factorMap = new Map();
      resFacGrammarMap = factorGrammar.factorGrammar(
        "",
        productions,
        factorMap,
        noTerminal
      );

<<<<<<< HEAD
      if (!(resFacGrammarMap instanceof Map)) {
        if (!(resFacGrammarMap instanceof Array)) {
          factorMap.set(noTerminal, resFacGrammarMap);
        } else {
          factorMap.set(noTerminal, resFacGrammarMap.join());
=======
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
<<<<<<< HEAD
            resPredictionSet = resPredictionSet + mapToString(resProductionSetMap, noTerminal)
        }

        // Res
        res.send("GRAMMAR: <br/>" + resGrammar +
            "<br/> <br/> FactorGrammar <br/><br/>" + resFacGrammar +
            "<br/> LeftRecursion: <br/><br/>" + resLeftRecursion +
            "<br/> LL1: " +
            "<br/> <br/> PRIM: <br/><br/>" + resFirstGrammar +
            "<br/> <br/> SIG: <br/><br/>" +
            "<br/> <br/> CP: <br/><br/>" + resPredictionSet)

    } catch (e) {
        // httpError(res, e)
=======
            resPredictionSet = resPredictionSet + utility.mapToString(resProductionSetMap, noTerminal)
>>>>>>> 2fda6287bf13ebff619366cfa98e0df7eb403630
        }
      } else {
        factorMap = resFacGrammarMap;
      }
      resFacGrammar = resFacGrammar + mapToString(factorMap, noTerminal);

<<<<<<< HEAD
      // leftRecursion
=======

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
>>>>>>> 2fda6287bf13ebff619366cfa98e0df7eb403630

      const recursionGrammar = leftRecursion.LeftRecursion(factorMap);
      resLeftRecursion =
        resLeftRecursion + mapToString(recursionGrammar, noTerminal);

      // LL1
      // PRIM
     
      resFirstMap = firstGrammar.firstGrammar(recursionGrammar);

      resFirstGrammar = resFirstGrammar + mapToString(resFirstMap, noTerminal);

      // SIG
      //llamado funcion siguientes.
      
      resFollowMap = followingGrammar.followingGrammar(recursionGrammar, resFirstMap,"CN");

      // inicio el metodo de obtencion de los siguientes

      //CONJUNTO PREDICCION
      resProductionSetMap = productionSet.productionSet(
        recursionGrammar,
        resFirstMap
      );
      resPredictionSet =
        resPredictionSet + mapToString(resProductionSetMap, noTerminal);
>>>>>>> b688c4ddb35d69274da414c5d9143f2979048821
    }

    // Res
    res.send(
      "GRAMMAR: <br/>" +
        resGrammar +
        "<br/> <br/> FactorGrammar <br/><br/>" +
        resFacGrammar +
        "<br/> LeftRecursion: <br/><br/>" +
        resLeftRecursion +
        "<br/> LL1: " +
        "<br/> <br/> PRIM: <br/><br/>" +
        resFirstGrammar +
        "<br/> <br/> SIG: <br/><br/>" +
        "<br/> <br/> CP: <br/><br/>" +
        resPredictionSet
    );
  } catch (e) {
    httpError(res, e);
  }
};

<<<<<<< HEAD
/*Formatea el mapa de las producciones en un string 
organizandolo alfabeticamente pero iniciando por la produccion inicial*/
function mapToString(map, noTerminal) {
  let stringMap = "";

<<<<<<< HEAD
    let stringMap = ""

    map = new Map([...map.entries()].sort())
=======
  map = new Map([...map.entries()].sort());
>>>>>>> b688c4ddb35d69274da414c5d9143f2979048821

  for (let [key, value] of map.entries()) {
    if (key.localeCompare(noTerminal) != 0) {
      stringMap = stringMap + key + "' -> " + value + "<br/>";
    } else {
      stringMap = key + " -> " + value + "<br/>" + stringMap;
    }
  }
  return stringMap;
=======


function buildMapGrammar(noTerminal, productions, grammarMap) {
    grammarMap.set(noTerminal, productions)
    return grammarMap
>>>>>>> 2fda6287bf13ebff619366cfa98e0df7eb403630
}

<<<<<<< HEAD

module.exports = { getGrammar }
=======
module.exports = { getGrammar };
>>>>>>> b688c4ddb35d69274da414c5d9143f2979048821
