const grammar = { "grammar": [] };

document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => {
        addProduction();
    }, 5000);
});

function addProduction() {
    const contentGrammar = document.getElementById("contentGrammar");
    const grammarJson = document.getElementById("grammarJson");
    document.getElementById("addProduction").addEventListener('click', (event) => {
        event.preventDefault();
        let noTerminal = document.getElementById("noTerminal");
        let production = document.getElementById("production");
        let html = "";
        if (noTerminal.value != "" && production.value != "") {
            grammar.grammar.push({ noTerminal: noTerminal.value, production: production.value });
            for (let i = 0; i < grammar.grammar.length; i++) {
                html += `
                    ${grammar.grammar[i].noTerminal} --> ${grammar.grammar[i].production}<br>
                `;
            }
            contentGrammar.innerHTML = html;
            grammarJson.value = JSON.stringify(grammar);
        }else {
            if (noTerminal.value == "") {
                html = "<div class='validacion'>El noTerminal no puede estar vacio</div";
            }
            if (production.value == "") {
                html = "<div class='validacion'>La producciones no pueden ir vacias</div>";
            }
            document.getElementById("rowProduction").innerHTML = html;
        }
        noTerminal.value = "";
        production.value = "";
        if (grammarJson.value != "") {
            document.getElementById("btnSumit").classList.remove("disabled");
        }
    });
}
