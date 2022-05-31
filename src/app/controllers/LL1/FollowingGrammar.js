const { Console } = require("console");

module.exports = {
  siguientes: (grammar) => {
    
    let siguientes = [];
   //este funciona para el primer valor
      for (let i = 0; i < grammar.length; i++) {
        let variablePrueba = grammar[i].producciones;
        let variableInicial = grammar[0].noTerminal;
        
        
        for (let index = 0; index < variablePrueba.length; index++) {
          if (variableInicial == variablePrueba[index]) {
            if (variablePrueba[index + 1] != "'") {
            
                
              siguientes[i] = variablePrueba.charAt(variablePrueba.length - 1)
              console.log("entra");
              if (siguientes[i]==grammar[i].noTerminal) {
                  //ingreso del prim del valor
                  console.log(grammar[i].noTerminal);
                
            } 
            }
          }
        }
      }
      siguientes.push('$');
      for (let p = 0; p <=siguientes.length; p++) {
          if(siguientes[p]!=undefined){
              console.log(siguientes[p]);
          }
          
          
      }
      
    
  },
};
