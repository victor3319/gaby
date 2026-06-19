const mongoose = require("mongoose");

//ESQUEMA
const usuarioEnUsoEsquema = new mongoose.Schema({
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
    }]
})

const usuariorEnUsoModelo = new mongoose.model("usuarioEnUso", usuarioEnUsoEsquema)

module.exports = usuariorEnUsoModelo