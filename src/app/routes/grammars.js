const express = require('express')
const router = express.Router()
const {getGrammar} = require('../controllers/MainGrammars')

router.get('/', getGrammar) 

module.exports = router