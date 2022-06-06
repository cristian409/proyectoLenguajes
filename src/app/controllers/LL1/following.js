module.exports = {
  followingGrammar: (productionsMap, primMap, inicial) => {
    let followMap = new Map();
    return followingGrammarFunc(productionsMap, followMap, primMap, inicial);
  },
};

function followingGrammarFunc(productionsMap, followMap, primMap, inicial) {
  let testMap = new Map();
  for (let noTerminal of productionsMap.keys()) {
    let arrayProductions = [];
    for (let produccion of productionsMap.values()) {
      productions = produccion.split("|");
      for (let i = 0; i < productions.length; i++) {
        if (productions[i].includes(noTerminal)) {
          let posicion = productions[i].indexOf(noTerminal, 0);
          let longitud = noTerminal.length;
          if (posicion != -1) {
            posicion += longitud;
            if (productions[i][posicion] !== "'") {
              arrayProductions.push(productions[i]);
            }
          }
        }
      }
    }
    testMap.set(noTerminal, arrayProductions);
  }
  for (let [key, value] of testMap) {
    let siguienteTerminal = [];

    if (key == inicial) {
      siguienteTerminal.push("$");
    }
    if (value != null) {
      for (let k = 0; k < value.length; k++) {
        let posicion = value[k].indexOf(key, 0);
        let longitud = key.length;
        posicion += longitud;
        if (value[k][posicion] == "'") {
          continue;
        }
        if (value[k][posicion] != undefined) {
          let mayusc = value[k][posicion];

          if (value[k][posicion] == mayusc.toUpperCase()) {
            for (let keyIni of productionsMap.keys()) {
              let varString = "";
              for (let j = 0; j < keyIni.length; j++) {
                if (value[k][posicion + j] == keyIni[j]) {
                  varString += keyIni[j];
                }
              }

              for (let [keyprim, valueprim] of primMap) {
                if (valueprim !== undefined) {
                  

                  if (varString == keyprim) {
                    for (let h = 0; h < valueprim.length; h++) {
                      if (!siguienteTerminal.includes(valueprim[h])) {
                        siguienteTerminal.push(valueprim[h]);
                      }
                    }
                  }
                }
              }
            }
          }
          if (value[k][posicion] == mayusc.toLowerCase()) {
            siguienteTerminal.push(value[k][posicion]);
          } else {
            let simbolos = "()*+-_.:;%&/#=<>?¡¿!^";
            if (value[k][posicion].includes(simbolos)) {
              siguienteTerminal.push(value[k][posicion]);
            }
          }
        }

        if (value[k][posicion] == undefined || value[k][posicion] == "λ") {
          let llave = "";
          for (let [keyIni, valueIni] of productionsMap) {
            let productIni = valueIni.split("|");

            for (let r = 0; r < productIni.length; r++) {
              if (productIni[r] == value[k]) {
                llave = keyIni;
              }
            }
          }

          for (let [keyFin, valueFin] of followMap) {
            if (keyFin == llave) {
              for (let u = 0; u < valueFin.length; u++) {
                if (!siguienteTerminal.includes(valueFin[u])) {
                  siguienteTerminal.push(valueFin[u]);
                }
              }
            }
          }
        }
      }
    }
    followMap.set(key, siguienteTerminal);
  }
  return followMap;
}
