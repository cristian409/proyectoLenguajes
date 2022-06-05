module.exports = {
    factorGrammar: (map) => {
        return factorGrammarF(map)
        // return factorGrammarFunc(alreadyFac, productions, factorMap, factorFather)
    }
}

function factorGrammarF(map) {
    let factorMap = new Map();
    for (let [key, value] of map) {
        productions = value.split("|");
        resFacGrammarMap = factorGrammarFunc(
            "",
            productions,
            factorMap,
            key
        );
        if (!(resFacGrammarMap instanceof Map)) {
            if (!(resFacGrammarMap instanceof Array)) {
                factorMap.set(key, resFacGrammarMap);
            } else {
                factorMap.set(key, resFacGrammarMap.join());
            }
        }
    }
    return factorMap;
}

// AlreadyFac: String de las producciones ya factorizadas
// productions: Producciones a factorizar
// factorMap: Mapa con las producciones finales factorizadas
// factorFather: Key Father 
function factorGrammarFunc(alreadyFac, productions, factorMap, factorFather) {


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

        factorGrammarFunc(alreadyFac, quotientsArray, factorMap, factor)
        alreadyFac = alreadyFac + factor + "(" + factor + "')"
        factorMap.set(factorFather, alreadyFac)
        if (noFactor != "") {
            alreadyFac = alreadyFac + "|" + factorGrammarFunc("", noFactor.split("|"), factorMap, factorFather)
            factorMap.set(factorFather, alreadyFac)
            return alreadyFac, factorMap
        }
        return alreadyFac
    } else {
        if (noFactor.localeCompare('') != 0) {

            alreadyFac = factor + "|" + factorGrammarFunc(alreadyFac, noFactor.split("|"), factorMap, factorFather)
            factorMap.set(factorFather, alreadyFac)
            return alreadyFac
        } else {
            return productions
        }
    }
}
