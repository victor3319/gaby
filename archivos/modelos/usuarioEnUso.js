const mongoose = require("mongoose");

//ESQUEMA
const usuarioEnUsoEsquema = new mongoose.Schema({
    usuarioEnUso:{
        type:[String],
        required: true
    }
})

const usuarioEnUsoModelo = new mongoose.model("usuarioEnUso", usuarioEnUsoEsquema)

module.exports = usuarioEnUsoModelo