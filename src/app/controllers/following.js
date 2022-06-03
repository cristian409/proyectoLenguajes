module.exports = {
  followingGrammar: (productionsMap, primMap, inicial) => {
    let followMap = new Map();

    return followingGrammarFunc(productionsMap, followMap, primMap, inicial);
  },
};

function followingGrammarFunc(productionsMap, followMap, primMap, inicial) {
  let siguientes = [];
  let testMap = new Map();
  let key = "";
  // iterando sobre las claves (verduras)
  for (let noTerminal of productionsMap.keys()) { 
    let arrayProductions = [];
    for (let produccion of productionsMap.values()) {
      productions = produccion.split("|");
      for (let i = 0; i < productions.length; i++) {
        if (productions[i].includes(noTerminal)) {
          arrayProductions.push(productions[i]);
         
        }
      }
    }testMap.set(noTerminal, arrayProductions);
  }
  console.log(testMap);

  // for (let [key,value] of productionsMap) {

  //     productions = value.split('|')
  //     if (key==inicial) {
  //         siguientes.push("{$}")
  //     }
  //     for (let i = 0; i < productions.length; i++) {

  //         let posicion=productions[i].indexOf(key,0)
  //         let longitud=key.length
  //         let siguienteTerminal="";
  //         if (posicion!=-1) {
  //             posicion+=longitud-1
  //             if (productions[posicion+1]=="'") {
  //                 continue
  //             }
  //             if (productions[posicion+1]==productions[posicion+1].toUpperCase()) {

  //             }
  //             if(productions[posicion+1]==null||productions[posicion+1]==λ){

  //                 if (siguienteTerminal==null) {
  //                     siguienteTerminal+=siguientes[i];
  //                 }

  //             }
  //         }

  //     }

  // }
}
