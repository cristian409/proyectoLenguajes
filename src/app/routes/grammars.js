const express = require('express')
const router = express.Router()
const {getGrammar} = require('../controllers/grammars')

router.get('/', getGrammar) 

module.exports = router