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
    tipo: {
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
    lTrabajo: {
        type:String,
        required: true
    },
    fInicioBusqueda: {
        type:String,
        required: true
    },

    fechaCierre: {type: mongoose.Schema.Types.Mixed},

    estatus: {type: mongoose.Schema.Types.Mixed},

    postulados: {type: mongoose.Schema.Types.Mixed},

    enProceso: {
        RRHH : {type: mongoose.Schema.Types.Mixed},
        jefe : {type: mongoose.Schema.Types.Mixed},
        pruebas : {type: mongoose.Schema.Types.Mixed},
        medico : {type: mongoose.Schema.Types.Mixed},
        ambiental : {type: mongoose.Schema.Types.Mixed},
        
    },
    responsabilidades: {type: mongoose.Schema.Types.Mixed},

    descartado : {type: mongoose.Schema.Types.Mixed}
})

const busquedasModelo = new mongoose.model("busquedas", busquedasEsquema)

module.exports = busquedasModelo