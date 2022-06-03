module.exports = {
    mapToString: (map, noTerminal) => {

        return mapToString(map, noTerminal)
    },

    startsWithCapital: (word) => {

        return startsWithCapital(word)
    },

    enumMapToString: (enumMap, initial) => {

        return enumMapToString(enumMap, initial)
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

    return stringMap + "<br/>"
}

/*Formatea el mapa de las producciones en un string 
organizandolo alfabeticamente pero iniciando por la produccion inicial*/
function enumMapToString(map) {
    let stringMap = ""

    for (let [step, productions] of map.entries()) {

        if (productions.has(999)) {
            stringMap += "<br/>-- " + productions.get(999).get(("(T)")) + " -> <br/>"
        }

        stringMap += "<br/>" + step + "<br/>"

        for (let [enumerator, grammarMap] of productions.entries()) {

            for (let [key, value] of grammarMap.entries()) {

                switch (key) {
                    case "R":
                        stringMap += " (R" + value + ")"
                        break
                    case "(T)":
                        break
                    default:
                        stringMap += enumerator + ". " + key + "' -> " + value
                        break
                }
            }

            stringMap += "<br/>"
        }
    }

    return stringMap
}


function startsWithCapital(word) {
    return word.charAt(0) === word.charAt(0).toUpperCase() && word >= 'A' && word <= 'Z'
}
