const express = require('express');
const app = express();

const fs = require("fs");
const path = require ("path");
const morgan = require("morgan");
const pdf = require("pdf-parse-new")


const statics = path.join(__dirname,"archivos")

//Configuración de Puerto
const PORT = process.env.PORT || 3000;

//app.set("port", process.env.PORT || 5000)

//express vistas
app.set("views", path.join(__dirname,"./archivos/vistas"))
app.set("view engine", "pug")

//express para leer json

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//express para leer rutas

app.use(require("./archivos/funciones_rutas/index"))

app.use(express.static(statics))

// 404 handler

app.use((req, res, next) =>{
     res.render("enConstruccion.pug")
})

//express bases
app.set("bases", path.join(__dirname,"./archivos/bases"))

//Escucha del Servidor
app.listen(process.env.PORT || 3000);



module.exports = app



