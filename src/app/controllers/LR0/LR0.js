const utility = require("../Utility/Utility")

module.exports = {
    lr0: (grammarMap, initial) => {


        let step = 0
        const stepMap = new Map()
        const fatherStepMap = new Map()

        enumGrammarMap = I0(grammarMap, initial)

        fatherStepMap.set("I-" + step, enumGrammarMap)

        step++
        process(enumGrammarMap, stepMap, step, fatherStepMap, enumGrammarMap)

        return removeCharacterFromString(utility.enumMapToString(fatherStepMap))
    }
}

function I0(grammarMap, initial) {
    const grammarMapEnum = new Map()
    let enumerator = 1

    addNewDerivation(grammarMapEnum, initial)

    for (let [noTerminal, productions] of grammarMap.entries()) {

        if (productions.includes("|"))
            grammarMapEnum, enumerator = enumSplitProductions(productions.split("|"), noTerminal, enumerator, grammarMapEnum)
        else
            grammarMapEnum, enumerator = enumProduction(productions, noTerminal, enumerator, grammarMapEnum)
    }

    return addPeriodToALLGrammar(grammarMapEnum)
}

function addNewDerivation(grammarMap, initial) {
    const tempMap = new Map()
    tempMap.set("S", initial)
    grammarMap.set(0, tempMap)

    return grammarMap
}

function enumSplitProductions(productions, noTerminal, enumerator, grammarMapEnum) {
    for (let i = 0; i < productions.length; i++) {
        const tempMap = new Map()
        tempMap.set(noTerminal, productions[i])
        grammarMapEnum.set(enumerator, tempMap)
        enumerator++
    }

    return grammarMapEnum, enumerator
}

function enumProduction(production, noTerminal, enumerator, grammarMapEnum) {
    const tempMap = new Map()
    tempMap.set(noTerminal, production)
    grammarMapEnum.set(enumerator, tempMap)
    enumerator++

    return grammarMapEnum, enumerator
}

function addPeriodToALLGrammar(grammarMapEnum) {
    for (let [enumerator, productionMap] of grammarMapEnum.entries()) {

        for (let [noTerminal, production] of productionMap.entries()) {
            const tempMap = new Map()
            production = "." + production
            tempMap.set(noTerminal, production)
            grammarMapEnum.set(enumerator, tempMap)
        }
    }

    return grammarMapEnum
}

function process(grammarMap, stepMap, step, fatherStepMap, originalGrammar) {

    for (let [enumerator, productionMap] of grammarMap.entries()) {

        console.log("step", step)
        console.log(grammarMap)
        console.log(productionMap)
        for (let [noTerminal, production] of productionMap.entries()) {

            var tempMap = new Map()
            if (!isAcept(production)) {

                if (!fatherStepMap.has("I-" + step)) {
                    transition = getTransition(production)
                    getProductionsByTransition(stepMap, transition, grammarMap)
                    movePeriodAllStep(stepMap)
                    verifyNextTranstion(stepMap, originalGrammar)
                    fatherStepMap.set("I-" + step, stepMap)
                    tempMap = setUpNewStep(stepMap, production, noTerminal)
                } else {
                    const map = new Map()

                    map.set(noTerminal, production)
                    tempMap.set(enumerator, map)
                }

                step++
                process(tempMap, tempMap, step, fatherStepMap, originalGrammar)
                //grammarMap.delete(enumerator)
            }
            //stepMap.set(999,tempMap)
        }
        break
    }

    return [stepMap, fatherStepMap]
}

function movePeriodAllStep(stepMap) {

    for (let [enumerator, productionMap] of stepMap.entries()) {
        const tempMap = new Map()

        for (let [noTerminal, production] of productionMap.entries()) {

            positionPeriod = findPositionPeriod(production)
            production = production.split("")
            period = production[positionPeriod]
            nextString = production[positionPeriod + 1]
            production[positionPeriod] = nextString
            production[positionPeriod + 1] = period
            production = production.join("")
            tempMap.set(noTerminal, production)
            stepMap.set(enumerator, tempMap)
        }
    }
}

function getProductionsByTransition(map, transition, grammarMap) {

    if (isNoTerminal(transition)) {

        for (let [enumerator, productionMap] of grammarMap.entries()) {

            for (let [noTerminal2, production] of productionMap.entries()) {
                const tempMap = new Map()

                if (production[1].localeCompare(transition) == 0) {

                    tempMap.set(noTerminal2, production)
                    map.set(enumerator, tempMap)
                }
            }
        }
    }
}

function getProductionsByNoTerminal(stepMap, noTerminal, grammarMap) {

    for (let [enumerator, productionMap] of grammarMap.entries()) {

        for (let [noTerminal2, production] of productionMap.entries()) {

            if (noTerminal2.localeCompare(noTerminal) == 0) {
                const tempMap = new Map()
                tempMap.set(noTerminal2, production)
                stepMap.set(enumerator, tempMap)
            }
        }
    }

    return stepMap
}

function verifyNextTranstion(stepMap, originalGrammar) {

    for (let [enumerator, productionMap] of stepMap.entries()) {

        for (let [noTerminal, production] of productionMap.entries()) {
            console.log("production2", noTerminal + " -> " + production)

            if (noTerminal.localeCompare("R") != 0) {

                if (isAcept(production)) {
                    productionMap.set("R", enumerator)

                    continue
                }

                nextTranstion = getTransition(production)

                if (isNoTerminal(nextTranstion)) {

                    getProductionsByNoTerminal(stepMap, nextTranstion, originalGrammar)
                }
            }
        }
    }
}

function setUpNewStep(stepMap, production, noTerminal) {

    const tempMap = new Map([...stepMap.entries()])

    transition = getNextTransition(production)
    removeReduceds(tempMap)


    if (isNoTerminal(transition)) {
        removeNoTransition(tempMap, noTerminal)
        getProductionsByTransition(tempMap, transition, stepMap)
    }

    return tempMap
}

function removeNoTransition(tempMap, noTerminal) {
    for (let [key, value] of tempMap.entries()) {
        if (!value.has(noTerminal)) {
            tempMap.delete(key)
        }
    }

}

function isNoTerminal(nextChar) {

    if (nextChar != undefined)
        return utility.startsWithCapital(nextChar)

    return false
}

function removeReduceds(tempMap) {

    for (let [key, value] of tempMap.entries()) {
        if (value.has("R")) {
            tempMap.delete(key)
        }
    }
}

/**
 * @param {string} production
 * @returns {int} period position
 */
function findPositionPeriod(production) {
    for (let i = 0; i < production.length; i++) {

        if (production[i].localeCompare(".") == 0) {

            return i
        }
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
    return production[positionPeriod + 2]
}