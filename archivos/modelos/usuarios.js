const mongoose = require("mongoose");

//ESQUEMA
const usuariosEsquema = new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    correo: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    tipo: {
        type:String,
        required: true
    },
    accesos: [{
        ADP : {type: mongoose.Schema.Types.Mixed},
        EYD : {type: mongoose.Schema.Types.Mixed}
    }],
    sessionToken:{
        type: mongoose.Schema.Types.Mixed
    }
})

const usuariosModelo = new mongoose.model("usuarios", usuariosEsquema)

module.exports = usuariosModelo