
module.exports = {
    recursion: (gramatica) => {
        let nuevaGramatica = { "gramatica": [] };
        for (let i = 0; i < gramatica.length; i++) {
            let noTerminal = gramatica[i].noTerminal;
            let listaBeta = [];
            let listaAlfa = [];
            let listaRecursion = [];
            let listaNoRecursion = [];
            let listaCadenaSobrante = [];
            let caracterPrimero;
            let cadenaSobrante;
            for (let j = 0; j < gramatica[i].productions.length; j++) {
                caracterPrimero = gramatica[i].productions[j].substring(0, noTerminal.length);
                cadenaSobrante = gramatica[i].productions[j].substring(noTerminal.length)
                if (noTerminal === caracterPrimero) {
                    listaRecursion.push(gramatica[i].productions[j]);
                    listaCadenaSobrante.push(cadenaSobrante);
                }else {
                    listaNoRecursion.push(gramatica[i].productions[j]);
                }
            }
            if (listaRecursion.length > 0) {
                listaNoRecursion.forEach(elemento => {
                    listaBeta.push(elemento+noTerminal+"'");
                });
                for(let pos = 0; pos <= listaRecursion.length; pos++){
                    if(pos === listaRecursion.length){
                        listaAlfa.push("λ");
                    }else {
                        listaAlfa.push(listaCadenaSobrante[pos]+noTerminal+"'");
                    }
                }
                nuevaGramatica.gramatica.push({"noTerminal":noTerminal,"productions":listaBeta});
                nuevaGramatica.gramatica.push({"noTerminal":noTerminal+"'","productions":listaAlfa});
            }else {
                nuevaGramatica.gramatica.push({"noTerminal":noTerminal,"productions":listaNoRecursion});
            }
        }
        return nuevaGramatica;
    }
}