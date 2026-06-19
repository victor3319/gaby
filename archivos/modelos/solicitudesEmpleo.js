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
})

const solicitudesEmpleoModelo = new mongoose.model("solicitudesEmpleo", solicitudesEmpleoEsquema)

module.exports = solicitudesEmpleoModelo