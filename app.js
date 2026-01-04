const express = require('express');
const app = express();

const path = require ("path");
const morgan = require("morgan")


const statics = path.join(__dirname,"archivos")

app.set("port", process.env.PORT || 5000)

//express vistas
app.set("views", path.join(__dirname,"./archivos/vistas"))
app.set("view engine", "pug")

//express para leer json

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}));

//express para leer rutas

app.use(require("./archivos/funciones_rutas/index"))

app.use(express.static(statics))

// 404 handler

app.use((req, res, next) =>{
    res.status(404).send("404 not found")
})

//express bases
app.set("bases", path.join(__dirname,"./archivos/bases"))



module.exports = app



