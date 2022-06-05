const express = require('express');
const router = express.Router();
const helpers = require('../helpers/helpers')
const factorGrammar = require("../controllers/LL1/FactorGrammar")
const leftRecursion = require("../controllers/LL1/LeftRecursion");
const firstGrammar = require("../controllers/LL1/FirstGrammar");
const LR0 = require("../controllers/LR0/LR0");

const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/index', (req, res) => {
    res.render('index.html');
});

router.post("/index",
    body('initial', "Ingrese un noTerminal Inicial").exists().not().isEmpty(),
    body('grammarJson', "Ingrese al menos una producción").exists().not().isEmpty(),
    (req, res) => {
        const error = validationResult(req);
        const initial = req.body.initial;
        const grammarJson = req.body.grammarJson;//gramatica Json recibida de la informacion del index
        if (!error.isEmpty()) {
            const validation = error.array();
            res.render('index.html', { validation: validation });//Se renderiza el index con la informacion de la validacion
        } else {
            const factorMap = helpers.grammarMap(grammarJson); //Se pasa el json por parametro y se recibe el objeto Mapa
            const factorMapFac = new Map() //Objeto Mapa que se utiliza en la factorizacion
            const recursionGrammar = leftRecursion.LeftRecursion(factorMap);//Recursion izquierda
            const resFirstMap = firstGrammar.firstGrammar(recursionGrammar);//Primeros 
            const gFactor = helpers.grammarJson(factorMapFac);//Se pasa el objeto mapa de la factorizacion
            const gLeftRecursion = helpers.grammarJson(recursionGrammar); //Se pasa el objeto mapa de la recursion y se convierte en json 
            const gFirtMap = helpers.grammarJson(resFirstMap);//Se pasa el objeto mapa de los primero y se convierte en json 
            const LR0Map = LR0.lr0(factorMap, initial)

            res.render('index.html', { gFactor, gLeftRecursion, gFirtMap, LR0Map });
        }
    });

module.exports = router