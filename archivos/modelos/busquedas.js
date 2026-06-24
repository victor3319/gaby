const mongoose = require("mongoose");

//ESQUEMA
const busquedasEsquema = new mongoose.Schema({
    cargo:{
        type:String,
        required: true
    },
    cliente: {
        type:String,
        required: true
    },
    correoCliente: {
        type:String,
        required: true
    },
    fechaInicio: {
        type:String,
        required: true
    },
    fechaCierre: {
        type:String,
        required: true
    },
    estatus: {
        type:String,
        required: true
    },
    postulacionesActivas: {
        type:String,
        required: true
    },
    postulacionesEvaluadas: {
        type:String,
        required: true
    },
    entrevistaRRHH: {
        type:String,
        required: true
    },
    EntrevistaJefe: {
        type:String,
        required: true
    },
    medico: {
        type:String,
        required: true
    },
    ambiental: {
        type:String,
        required: true
    },
    Descripcion: [{
        ADP : {type: mongoose.Schema.Types.Mixed},
        EYD : {type: mongoose.Schema.Types.Mixed}
    }]
})

const busquedasModelo = new mongoose.model("busquedas", busquedasEsquema)

module.exports = busquedasModelo