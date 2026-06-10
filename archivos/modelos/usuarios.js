const mongoose = require("mongoose");

//SUB ESQUEMA 
const accesosEsquema = new mongoose.Schema({
 ADP : {
    type: String
 },
 EYD : {
    type: String
 }
 
})

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
    accesos: {
        type: [accesosEsquema],
        required: true
    }
})

const usuariosModelo = new mongoose.model("usuarios", usuariosEsquema)

module.exports = usuariosModelo