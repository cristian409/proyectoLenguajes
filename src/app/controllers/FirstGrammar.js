module.exports = {
    firstGrammar: (productionsMap) => {
        const firstMap = new Map()
        return firstGrammarFunc(productionsMap, firstMap)
    }
}


function firstGrammarFunc(productionsMap, firstMap) {

    
    
    for (let [key, value] of productionsMap) {

        firstCharProd = value[0]
        if (firstCharProd !== firstCharProd.toUpperCase()) { // Si el primer caracter de la producción está en mayuscula (no terminal)

            let primValue = ""
            productions = value.split('|')
            let prim = ""

            for (let i = 0; i < productions.length; i++) {

                if (productions[i][0] !== productions[i][0].toUpperCase()) { // Si el primer caracter del elemento es terminal

                    primValue = ""
                    for (let k = 0; k < productions[i].length; k++) { // Recorrer todas las terminales de una parte antes de una no terminal

                        if (productions[i][k] === productions[i][k].toUpperCase()) { // Si es no terminal, termina el ciclo
                            break
                        } else // Si es terminal, agrega el valor al prim
                            primValue = primValue + productions[i][k]
                    }

                    if (i != 0)
                        prim = prim + "," + primValue
                    else
                        prim = prim + primValue

                    firstMap.set(key, "{" + prim + "}")
                }
            }
        }
    }

    return firstMap
}

