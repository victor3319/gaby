const mongoose = require("mongoose");

//ESQUEMA
const solicitudesEmpleoEsquema = new mongoose.Schema({
    nombres:{
        type:String,
        required: true
    },
    apellidos:{
        type:String,
        required: true
    },
    telefono:{
        type:String,
        required: true
    },
    correo: {
        type:String,
        required: true
    },
    carrera: {
        type:String,
        required: true
    },
    sueldo: {
        type:String,
        required: true
    },
    linkedIn: {
        type:String,
        required: true
    },
    texto: {
        type:String,
        required: true
    },
    archivo: {
        type:String,
        required: true
    },
    fechaSolicitud: { 
        type: Date, default: Date.now 
    },
    cargo: {
        type:String,
        required: true
    },
    entrevistaRRHH: [{
            fecha : {type: mongoose.Schema.Types.Mixed},
            estado : {type: mongoose.Schema.Types.Mixed}
        }],
    entrevistaJefe: [{
            fecha : {type: mongoose.Schema.Types.Mixed},
            estado : {type: mongoose.Schema.Types.Mixed}
        }],
    medico: [{
            fecha : {type: mongoose.Schema.Types.Mixed},
            estado : {type: mongoose.Schema.Types.Mixed}
        }],
    ambiental: [{
            fecha : {type: mongoose.Schema.Types.Mixed},
            estado : {type: mongoose.Schema.Types.Mixed}
        }],
})

const solicitudesEmpleoModelo = new mongoose.model("solicitudesEmpleo", solicitudesEmpleoEsquema)

module.exports = solicitudesEmpleoModelo