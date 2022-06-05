const utility = require("../Utility/Utility")

module.exports = {

    lr0: (grammarMap, initial) => {
        let step = 0
        const stepMap = new Map()
        const fatherStepMap = new Map()
        const enumGrammarMap = new Map()
        const listAcepted = []
        I0(grammarMap, initial, enumGrammarMap)
        fatherStepMap.set("I-" + step, enumGrammarMap)
        step++
        process(enumGrammarMap, stepMap, step, fatherStepMap, enumGrammarMap, listAcepted)

        return removeCharacterFromString(utility.enumMapToString(fatherStepMap))
    }
}

function I0(grammarMap, initial, grammarMapEnum) {
    addNewDerivation(grammarMapEnum, initial)
    enumGrammars(grammarMapEnum, grammarMap)
    loopGrammarMap(grammarMapEnum, "addPeriodToALLGrammar")
}

function addNewDerivation(grammarMapEnum, initial) {
    const tempMap = new Map()
    tempMap.set("S", initial)
    grammarMapEnum.set(0, [tempMap])
}

function enumGrammars(grammarMapEnum, grammarMap) {
    let enumerator = 1
    for (let [noTerminal, productions] of grammarMap.entries()) {
        if (productions.includes("|"))
            enumerator = enumSplitProductions(productions.split("|"), noTerminal, enumerator, grammarMapEnum)
        else
            enumerator = enumNotSplitProduction(productions, noTerminal, enumerator, grammarMapEnum)
    }
}

function enumSplitProductions(productions, noTerminal, enumerator, grammarMapEnum) {
    for (let i = 0; i < productions.length; i++) {
        const tempMap = new Map()
        tempMap.set(noTerminal, productions[i])
        grammarMapEnum.set(enumerator, [tempMap])
        enumerator++
    }
    return enumerator
}

function enumNotSplitProduction(production, noTerminal, enumerator, grammarMapEnum) {
    const tempMap = new Map()
    tempMap.set(noTerminal, production)
    const tempArray = grammarMapEnum.get(enumerator)
    tempArray.push(tempArray)
    grammarMapEnum.set(enumerator, tempArray)
    return enumerator++
}

function addPeriodToALLGrammar(listGrammarMap, noTerminal, production) {
    periodProduction = "." + production
    listGrammarMap.set(noTerminal, periodProduction)
}

function process(grammarMap, stepMap, step, fatherStepMap, originalGrammar, listAcepted) {
    for (let [enumerator, listGrammarsMaps] of grammarMap.entries()) {
        if (!listAcepted.includes(enumerator)) {
            for (let i = 0; i < listGrammarsMaps.length; i++) {
                for (let [noTerminal, production] of listGrammarsMaps[i].entries()) {

                    var tempMap = new Map()
                    if (!isAcept(production)) {
                        if (!fatherStepMap.has("I-" + step)) {
                            transition = getTransition(production)
                            const tempMapTransition = new Map()
                            tempMapTransition.set("(T)",transition)
                            stepMap.set(999, tempMapTransition)
                            loopGrammarMap(grammarMap, "getProductionsByTransition", stepMap, transition)
                            loopGrammarMap(stepMap, "movePeriodAllStep")
                            verifyNextTranstion(stepMap, originalGrammar, step, listAcepted)
                            fatherStepMap.set("I-" + step, stepMap)
                            tempMap = setUpNewStep(stepMap, production, enumerator)
                        } else {
                            const map = new Map()
                            map.set(noTerminal, production)
                            tempMap.set(enumerator, [map])
                        }
                        
                        step++
                        process(tempMap, tempMap, step, fatherStepMap, originalGrammar, listAcepted)
                    }
                }
            }
        }
    }

    return [stepMap, fatherStepMap]
}

function loopGrammarMap(grammarMap, func, stepMap, transition) {
    for (let [enumerator, listGrammarsMaps] of grammarMap.entries()) {
        for (let i = 0; i < listGrammarsMaps.length; i++) {
            for (let [noTerminal, production] of listGrammarsMaps[i].entries()) {
                switch (func) {
                    case "addPeriodToALLGrammar":
                        addPeriodToALLGrammar(listGrammarsMaps[i], noTerminal, production)
                        break
                    case "movePeriodAllStep":
                        movePeriodAllStep(grammarMap, noTerminal, production, enumerator)
                        break
                    case "getProductionsByTransition":
                        getProductionsByTransition(stepMap, transition, noTerminal, production, enumerator)
                        break
                    case "getProductionsByNoTerminal":
                        getProductionsByNoTerminal(stepMap, transition, noTerminal, production, enumerator)
                        break
                    default:
                        break
                }
            }
        }
    }
}

function movePeriodAllStep(stepMap, noTerminal, production, enumerator) {
    const tempMap = new Map()
    positionPeriod = findPositionPeriod(production)
    production = production.split("")
    period = production[positionPeriod]
    let adder = 1
    nextString = production[positionPeriod + adder]
    buildTransition = nextString

    if (!isNoTerminal(nextString)) {
        adder++
        nextString = production[positionPeriod + adder]

        while (nextString != undefined && !isNoTerminal(nextString)) {
            buildTransition += nextString
            adder++
            nextString = production[positionPeriod + adder]
        }

        if (buildTransition.length > 1) {
            for (let i = positionPeriod; i < production.length; i++) {
                production[i] = buildTransition[i]
            }
        } else {
            production[positionPeriod] = buildTransition
        }

        production[positionPeriod + adder - 1] = period

    } else {
        production[positionPeriod] = buildTransition
        production[positionPeriod + adder] = period
    }
    production = production.join("")
    tempMap.set(noTerminal, production)
    stepMap.set(enumerator, [tempMap])
}

function verifyNextTranstion(stepMap, originalGrammar, step, listAcepted) {
    const alreadyVericated = []
    for (let [enumerator, listGrammarsMaps] of stepMap.entries()) {
        for (i = 0; i < listGrammarsMaps.length; i++) {
            for (let [noTerminal, production] of listGrammarsMaps[i].entries()) {
                nextTranstion = getTransition(production)
                if (!alreadyVericated.includes(nextTranstion) && !listAcepted.includes(enumerator)) {
                    if (nextTranstion != undefined) {
                        alreadyVericated.push(nextTranstion)
                    }

                    if (noTerminal.localeCompare("R") != 0) {
                        if (isAcept(production)) {
                            listGrammarsMaps[i].set("R", enumerator)
                            listAcepted.push(enumerator)

                            continue
                        }

                        if (isNoTerminal(nextTranstion))
                            loopGrammarMap(originalGrammar, "getProductionsByNoTerminal", stepMap, nextTranstion)
                    }
                }
            }
        }
    }
}

function getProductionsByTransition(map, transition, noTerminal, production, enumerator) {
    const tempMap = new Map()
    incomingTransition = production[1]
    if (incomingTransition.localeCompare(transition) == 0) {

        tempMap.set(noTerminal, production)
        map.set(enumerator, [tempMap])
    }
}

function getProductionsByNoTerminal(stepMap, noTerminal, noTerminal2, production, enumerator) {
    if (noTerminal2.localeCompare(noTerminal) == 0) {
        const tempMap = new Map()
        tempMap.set(noTerminal2, production)

        if (stepMap.get(enumerator) == undefined)
            stepMap.set(enumerator, [tempMap])
        else {
            tempArray = stepMap.get(enumerator)
            tempArray.push(tempMap)
            stepMap.set(enumerator, tempArray)
        }
    }
}

function setUpNewStep(stepMap, production, enumerator) {
    const tempMap = new Map([...stepMap.entries()])
    transition = getNextTransition(production)
    removeReduceds(tempMap)

    if (isNoTerminal(transition)) {
        removeNoTransition(tempMap, enumerator)
        loopGrammarMap(stepMap, "getProductionsByTransition", tempMap, transition)
    }

    return tempMap
}

function removeNoTransition(tempMap, enumerator) {
    listGrammarsMaps = tempMap.get(enumerator)[0]
    tempMap.clear()
    tempMap.set(enumerator, [listGrammarsMaps])
}

function isNoTerminal(nextChar) {
    if (nextChar != undefined)
        return utility.startsWithCapital(nextChar)

    return false
}

function removeReduceds(tempMap) {
    for (let [enumerator, listGrammarsMaps] of tempMap.entries()) {
        for (let i = 0; i < listGrammarsMaps.length; i++) {
            if (listGrammarsMaps[i].has("R"))
                tempMap.delete(enumerator)
        }
    }
}

function findPositionPeriod(production) {
    for (let i = 0; i < production.length; i++) {
        if (production[i].localeCompare(".") == 0)
            return i
    }
}

function removeCharacterFromString(string) {

    return string.replace(/'/g, '');
}

function isAcept(production) {
    positionPeriod = findPositionPeriod(production)

    return production[positionPeriod + 1] == undefined
}

function getTransition(production) {
    positionPeriod = findPositionPeriod(production)

    return production[positionPeriod + 1]
}

function getNextTransition(production) {
    positionPeriod = findPositionPeriod(production)
    nextString = production[positionPeriod + 2]

    return nextString
}