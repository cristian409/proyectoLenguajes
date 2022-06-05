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
}
