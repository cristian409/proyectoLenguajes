module.exports = {
  productionSet: (recursionGrammar, resFirstMap, resfollowMap) => {
    const conjuntoMap = new Map();
    return conjuntoGrammarFun(
      recursionGrammar,
      resFirstMap,
      resfollowMap,
      conjuntoMap
    );
  },
};

function conjuntoGrammarFun(
  recursionGrammar,
  resFirstMap,
  resfollowMap,
  conjuntoMap
) {
  let stringMayus = /[A-Z]/;
  for (let [key, value] of recursionGrammar) {
    let followString = "";
    let temporal = "";
    productions = value.split("|");
    for (let i = 0; i < productions.length; i++) {
      temporal = `${key}-->${productions[i]}`;
      if (stringMayus.test(productions[i][0])) {
        for (let [keyFirst, valueFirst] of resFirstMap) {
          if (key === keyFirst) {
            if (valueFirst !== undefined) {
              if (valueFirst.includes("λ")) {
                for (let [keyFollow, valueFollow] of resfollowMap) {
                  if (key == keyFollow) {
                    followString += `${valueFirst.length - 1},${valueFollow}`;
                    conjuntoMap.set(temporal, followString);
                  }
                }
              } else {
                conjuntoMap.set(temporal, valueFirst);
              }
            }
          }
        }
      } else {
        if (productions[i][0] === "λ") {
          for (let [keyFollow, valueFollow] of resfollowMap) {
            if (key == keyFollow) {
              conjuntoMap.set(temporal, valueFollow);
            }
          }
        } else {
          if (!stringMayus.test(productions[i][1])) {
            let temporal1 = `${productions[i][0]}${productions[i][1]}`;
            conjuntoMap.set(temporal, temporal1);
          } else {
            conjuntoMap.set(temporal, productions[i][0]);
          }
        }
      }
    }
  }
  return conjuntoMap;
}
