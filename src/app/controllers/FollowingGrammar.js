const { Console, log } = require("console");

module.exports = {
  followingGrammar: (productionsMap, counter) => {
    let followMap = ["CN", "FN(DN')", "DN'", "oxFN(DN')|λ", "FN", "tt"];
    let primMap = ["CN'", "ox,λ", "FN", "tt"];

    return followingGrammarFunc(productionsMap, followMap, primMap);
  },
};

function followingGrammarFunc(productionsMap, followMap, primMap) {
  //declaracion de variables
  let primero = followMap[0];
  let siguienteP = [];
  let siguiente = [];
  let siguientes = [];

  let contador = 0;
  let contadorPrim = 0;

  let producciones = [];
  let produccionesPrim = [];
  let terminales = [];
  let terminalesPrim = [];
  let match = [];
  
  //divicion por partes de el arreglo para poder operarlo
  for (let i = 0; i < followMap.length; i++) {
    //recorrido del mapa
    contador += 1;

    if (primero === followMap[i]) {
      //si es el primero se le añade $
      console.log(primero);
      siguienteP.push("$");
    }
    if (contador % 2 == 0) {
      //si es un valor par se toma como produccion
      producciones.push(followMap[i]);
    } else if (contador % 2 > 0) {
      //si es un valor impar se toma como terminal
      terminales.push(followMap[i]);
    }
  }

  //inicio de operaciones para determinar donde de las producciones hay similares
  for (let k = 0; k < terminales.length; k++) {
    //recorrido de terminales
    for (let l = 0; l < producciones.length; l++) {
      //recorrido de producciones
      if (producciones[l].match(terminales[k])) {
        //si las producciones en la posicion tiene un valor igual a la posicion del terminal
        match.push(producciones[l]); //se toma la posicion para recorrerla individualmente
        
        if (match) {
         
          //si match tiene algo entra
          console.log("este es el primero",primero);
          console.log("este es el terminal en turno",terminales[k]);

          if (terminales[k] == primero) {
            //si el valor es el primero entra
            for (let m = 0; m < producciones[l].length; m++) {
              // recorrido de las producciones individual
              if (producciones[l][m].match(terminales[k])) {
                console.log("aquí está la letra que está haciendo el match",producciones[l][m]);
                //quí solo funciona con uno: si producciones en la letra es igual a el terminal entra
                if (
                  producciones[l][m + 1] == null ||
                  producciones[l][m + 1] == "λ"
                ) {
                  //si la produccion en la posicion es nulo o lambda que es lo mismo se añade los siguientes en la posicion en la que está
                  siguienteP.push(siguientes[k]);
                }
                for (let x = 0; x < terminales.length; x++) {
                  // recorrido para verificar si la produccion+1 tiene terminal.
                  if (producciones[l][m + 1].match(terminales[x])) {
                    //si la posicion en la que está la produccion es igual a un terminal
                    for (let i = 0; i < primMap.length; i++) {
                      //ciclo para recorrer el resultado de los primos
                      contadorPrim += 1;
                      if (contador % 2 > 0 && primMap[i].match(terminales[x])) {
                        //si el valor es primo  se agrega al siguiente del primero los prim
                        siguienteP.push(primMap[i + 1]);
                      }
                    }
                  }
                  if (!producciones[l][m + 1].match(terminales[x])) {
                    //si la produccion en la posicion no es terminal se añade al siguiente
                    siguienteP.push(producciones[l][m + 1]);
                  }
                }
              }
            }
          }
          if (terminales[k] != primero) {
            for (let m = 0; m < producciones[l].length; m++) {
              if (producciones[l][m].match(terminales[k])) {
                if (
                  producciones[l][m + 1] == null ||
                  producciones[l][m + 1] == "λ"
                ) {
                  siguiente.push(siguientes[k]);
                }
                for (let x = 0; x < terminales.length; x++) {
                  if (producciones[l][m + 1].match(terminales[x])) {
                    for (let i = 0; i < primMap.length; i++) {
                      contadorPrim += 1;
                      if (contador % 2 > 0) {
                        siguiente.push(primMap[i + 1]);
                      }
                    }
                  }
                  if (!producciones[l][m + 1].match(terminales[x])) {
                    siguiente.push(producciones[l][m + 1]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  siguientes.push(siguienteP);
  siguientes.push(siguiente);

  console.log(siguientes);
  console.log("mapa completo");
  console.log(followMap);

  console.log("producciones completas");

  console.log(producciones);

  console.log("terminales completos");

  console.log(terminales);

  /*} else if ((contador = 1 && contador != null)) {
    // si se tiene un valor de 1 en el terminal
    for (let j = 0; j < value.length; j++) {
      if (value[j] == key) {
        if (value[j + 1 == null]) {
          sig.push(siguientes(key, value, productionsMap));
        }
      }
    }
  }*/
  return followMap;
}

/*if (contador>1 && contador<=4 && contador!=null) {//si se tiene un valor mayor que 1 en el terminal
      for (let i = 0; i < value.length; i++) {
        if ((value[i] == key[0])) {
          //si el valor en la posicion i es igual al de la llave entra

          if ((value[i + 1] == key[1])) {
            // si el valor en la posicion i+1 es igual a la llave entra
          }
        }
      }
    }
    else if (contador=1 && contador!=null) {// si se tiene un valor de 1 en el terminal
      for (let j = 0; j < value.length; j++) {
        if(value[j]==key){
          if(value[j+1==null]){
            sig.push(siguientes(key,value,productionsMap));
          }
        }
        
      }
      
    }
  }*/

/*function siguientes(key1,value1,productionsMap) {
  for (let [key, value] of productionsMap) {
    console.log("terminal " + key);
    console.log("produccion " + value);
    contador = key.length;
    if (contador>1 && contador<=4 && contador!=null) {//si se tiene un valor mayor que 1 en el terminal
      for (let i = 0; i < value.length; i++) {
        if ((value[i] == key[0])) {
          //si el valor en la posicion i es igual al de la llave entra

          if ((value[i + 1] == key[1])) {
            // si el valor en la posicion i+1 es igual a la llave entra
          }
        }
      }
    }
    else if (contador=1 && contador!=null) {// si se tiene un valor de 1 en el terminal
      for (let j = 0; j < value.length; j++) {
        if(value[j]==key){
          if(value[j+1]==null){
            sig.push(siguientes(key,value,productionsMap));
          }
          if(value[j+1]==){
            sig.push(siguientes(key,value,productionsMap));
          }
        }
        
      }
      
    }
  }
  
}*/
