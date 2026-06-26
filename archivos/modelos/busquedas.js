const mongoose = require("mongoose");

//ESQUEMA
const busquedasEsquema = new mongoose.Schema({
    codigo:{
        type:String,
        required: true
    },
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
    postulados: {
        type:String,
        required: true
    },
    enProceso: {
        RRHH : {type: mongoose.Schema.Types.Mixed},
        jefe : {type: mongoose.Schema.Types.Mixed},
        pruebas : {type: mongoose.Schema.Types.Mixed},
        medico : {type: mongoose.Schema.Types.Mixed},
        ambiental : {type: mongoose.Schema.Types.Mixed}
    },
    descartados: {
        type:String,
        required: true
    },
})

const busquedasModelo = new mongoose.model("busquedas", busquedasEsquema)

module.exports = busquedasModelo