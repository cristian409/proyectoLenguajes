module.exports = {
    conjunto: (recursionGrammar,resFirstMap) =>{
        const conjuntoMap = new Map();
        return conjuntoGrammarFun (recursionGrammar,resFirstMap,conjuntoMap);
    }
}

function conjuntoGrammarFun (recursionGrammar,resFirstMap,conjuntoMap) {
    for(let [key, value] of recursionGrammar){
        for(let [keyPrimero, valuePrimero] of resFirstMap){
            if(value !== "λ"){
                if(key == keyPrimero && valuePrimero.includes("{")){
                    conjuntoMap.set(key, valuePrimero)
                }
            }else {
                conjuntoMap.set(key, "{0}")
            }
        }
    }
    return conjuntoMap;
}