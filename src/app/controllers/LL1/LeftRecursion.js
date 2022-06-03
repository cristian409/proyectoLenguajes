<<<<<<< HEAD:src/app/controllers/LeftRecursion.js

module.exports = {
    LeftRecursion: (produccionesMap) => {
        const recursionMap = new Map();
        return recursionGrammarFunc(produccionesMap, recursionMap);
    }
}

function recursionGrammarFunc(produccionesMap, recursionMap) {
    
    for(let [key, value] of produccionesMap){
        let caracterPrimario;
        let cadenaSobrante;
        let listaRecursion= [];
        let listNoRecursion = [];
        let listaSobrante = [];
        let listaBeta = [];
        let listaAlfa = [];
        productions = value.split('|');

        for(let i=0; i<productions.length;i++){
            caracterPrimario = productions[i].substring(0,key.length);
            cadenaSobrante = productions[i].substring(key.length);
            if(caracterPrimario === key){
                listaRecursion.push(productions[i]);
                listaSobrante.push(cadenaSobrante);
            }else {
                listNoRecursion.push(productions[i]);
            }
        }
        if(listaRecursion.length > 0){
            listNoRecursion.forEach(elemento =>{
                listaBeta.push(`${elemento}(${key}')`);
            });
            for(let j=0;j<=listaRecursion.length;j++){
                if(j == listaRecursion.length){
                    listaAlfa.push("λ");
                }else {
                    listaAlfa.push(`${listaSobrante[j]}(${key}')`);
                }
            }
            let produccionAlfa = listaAlfa.join("|");
            let produccionBeta = listaBeta.join("|");
            let noTerminalPrimo = `(${key}')`
            recursionMap.set(key, produccionBeta);
            recursionMap.set(noTerminalPrimo, produccionAlfa);
        }else{
            let produccionNoRecursion = listNoRecursion.join("|");
            recursionMap.set(key, produccionNoRecursion);
        }
    }
    return recursionMap;
}
=======

module.exports = {
    LeftRecursion: (produccionesMap) => {
        const recursionMap = new Map();
        return recursionGrammarFunc(produccionesMap, recursionMap);
    }
}

function recursionGrammarFunc(produccionesMap, recursionMap) {
    let caracterPrimario;
    let cadenaSobrante;
    let listaRecursion= [];
    let listNoRecursion = [];
    let listaSobrante = [];
    let listaBeta = [];
    let listaAlfa = [];
    for(let [key, value] of produccionesMap){

        productions = value.split('|');

        for(let i=0; i<productions.length;i++){
            caracterPrimario = productions[i].substring(0,key.length);
            cadenaSobrante = productions[i].substring(key.length);
            if(caracterPrimario === key){
                listaRecursion.push(productions[i]);
                listaSobrante.push(cadenaSobrante);
            }else {
                listNoRecursion.push(productions[i]);
            }
        }
        if(listaRecursion.length > 0){
            listNoRecursion.forEach(elemento =>{
                listaBeta.push(`${elemento}(${key}')`);
            });
            for(let j=0;j<=listaRecursion.length;j++){
                if(j == listaRecursion.length){
                    listaAlfa.push("λ");
                }else {
                    listaAlfa.push(`${listaSobrante[j]}(${key}')`);
                }
            }
            let produccionAlfa = listaAlfa.join("|");
            let produccionBeta = listaBeta.join("|");
            let noTerminalPrimo = `(${key}')`
            recursionMap.set(key, produccionBeta);
            recursionMap.set(noTerminalPrimo, produccionAlfa);
        }else{
            let produccionNoRecursion = listNoRecursion.join("|");
            recursionMap.set(key, produccionNoRecursion);
        }
    }
    return recursionMap;
}
>>>>>>> 2fda6287bf13ebff619366cfa98e0df7eb403630:src/app/controllers/LL1/LeftRecursion.js
  