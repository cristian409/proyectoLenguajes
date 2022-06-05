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
    let stringMap = "<div class='container'>"

    for (let [step, productions] of map.entries()) {

        stringMap += "<div class='item'>"

        if (productions.has(999)) {
            stringMap += "<div class='item2'> -- " + productions.get(999).get(("(T)")) + " -> </div>"
        } else {
            stringMap += "<div class='item2'> -------> </div>"
        }

        stringMap += " <div class='item2'> [" + step + "] </div> <br/>"
        for (let [enumerator, listGrammarsMaps] of productions.entries()) {
            for (let i = 0; i < listGrammarsMaps.length; i++) {
                for (let [key, value] of listGrammarsMaps[i].entries()) {
                    switch (key) {
                        case "R":
                            stringMap += "<p class='reduceText'> (R" + value + ") </p>"
                            break
                        case "(T)":
                            break
                        default:
                            stringMap += enumerator + ". " + key + " -> " + value
                            break
                    }
                }
                stringMap += "<br/>"
            }
        }
        stringMap += "</div>"
    }

    return stringMap + "</div>"
}


function startsWithCapital(word) {
    return word.charAt(0) === word.charAt(0).toUpperCase() && word >= 'A' && word <= 'Z'
}
