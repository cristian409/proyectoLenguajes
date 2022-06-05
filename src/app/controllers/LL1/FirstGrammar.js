module.exports = {
    firstGrammar: (productionsMap) => {
        const firstMap = new Map()
        return firstGrammarFunc(productionsMap, firstMap)
    }
}


function firstGrammarFunc(productionsMap, firstMap) {
    let stringMayus = /[A-Z]/;
    let prim = "";
    for (let [key, value] of productionsMap) {
        firstCharProd = value[0];
        if (!stringMayus.test(firstCharProd)) {
            prim = getPrimDos(value, stringMayus);
            firstMap.set(key, prim);
        } else {
            prim = getPrim(productionsMap, firstCharProd, stringMayus);
            firstMap.set(key, prim);
        }
    }
    return firstMap
}


function getPrim(productionsMap, firstCharProd, stringMayus) {
    for (let [key, value] of productionsMap) {
        if (key === firstCharProd) {
            firstCharProd = value[0];
            if (stringMayus.test(firstCharProd)) {
                getPrim(productionsMap, firstCharProd, stringMayus)
            } else {
                return getPrimDos(value, stringMayus);
            }
        }
    }
}

function getPrimDos(value, stringMayus) {
    let primValue = "";
    productions = value.split('|');
    let prim = "";
    for (let i = 0; i < productions.length; i++) {
        if (!stringMayus.test(productions[i][0])) {
            primValue = "";
            for (let k = 0; k < productions[i].length; k++) {
                if (stringMayus.test(productions[i][k])) {
                    break;
                } else {
                    primValue += productions[i][k];
                }
            }
        }
        if (i != 0) {
            prim += `, ${primValue}`;
        } else {
            prim += primValue;
        }
    }
    return prim;
}
