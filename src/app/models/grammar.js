const mongoose = require("mongoose")

const grammarScheme = new mongoose.Schema({
    noTerminal: {
        type: String
    },
    productions: {
        type: Array
    }
},
{
    versionKey: false
})

module.exports = mongoose.model("grammars", grammarScheme)