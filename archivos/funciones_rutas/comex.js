const {Router} = require("express");
const router = Router();
const fs = require("fs");
const var_const = require("./var_const");
const js = require("./js");
const path = require ("path");
const multer = require("multer");
const pdf = require("pdf-parse-new");
const session = require('express-session');
const crypto = require("crypto");

//MODELOS IMPORTADOS
const usuarioEnUsoDB = require("../modelos/usuarioEnUso");
const usuariosDB = require("../modelos/usuarios");
const solicitudesEmpleoDB = require("../modelos/solicitudesEmpleo")
const busquedasDB = require("../modelos/busquedas")
const console = require("console");
const { ClientEncryption } = require("mongodb");
const { isArray } = require("util");


var listaResponsabilidades = []
var cargos = []

//Configurar almacenamiento
        const storage = multer.diskStorage({
            destination: 'uploads/recibos',
            filename: (req, file, cb) => {
                //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = path.extname(file.originalname);
                cb(null, file.fieldname + '-' + ext);
            }
        });

        const upload = multer({ storage });


//Middleware para validar un unico logeo por Usuario

async function validarSesion(req, res, next){
    if(!req.session.usuario){
        return res.redirect("/");
    }
    const usuario = await usuariosDB.findById(
        req.session.usuario._id);

        if(!usuario || usuario.sessionToken !== req.session.sessionToken){
            req.session.destroy(() => {});
            return res.redirect("/");
        }
        next();
}

//Ruta de COMEX

router.post("/comex", validarSesion, async (req, res)=>{
    if(!req.session.usuario){
        return res.redirect('/');
    }
    else{
        var boton = req.body
        console.log(boton)
        res.render("procesosEspecificos.pug",{
            h1: req.session.usuario.nombre,
            accesos: Object.keys(req.session.usuario.accesos[0]).splice(1),
            proceso : "planificacion"
        })
    }
})




module.exports = router