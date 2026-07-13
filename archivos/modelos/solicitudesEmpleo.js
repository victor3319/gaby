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
        type: mongoose.Schema.Types.Mixed 
    },
    enProceso: [{
            RRHH : { type: mongoose.Schema.Types.Mixed },
            jefe : {type: mongoose.Schema.Types.Mixed},
            pruebas : {type: mongoose.Schema.Types.Mixed},
            medico : {type: mongoose.Schema.Types.Mixed},
            ambiental : {type: mongoose.Schema.Types.Mixed}
        }],
    estatus: {
        type:String,
        required: true
    }
})

const solicitudesEmpleoModelo = new mongoose.model("solicitudesEmpleo", solicitudesEmpleoEsquema)

module.exports = solicitudesEmpleoModelo