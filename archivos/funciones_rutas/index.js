const {Router} = require("express");
const router = Router();
const fs = require("fs");
const var_const = require("./var_const");
const js = require("./js");
const path = require ("path");
const multer = require("multer");


var usuario = []

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


router.get("/", (req, res, next) =>{
    res.render("index.pug")
    next()
    usuario = []
    return usuario
})

router.get("/home", (req, res, next) =>{
    res.render("home.pug",{h1 : var_const.usuarioEnUso[0], accesos: var_const.usuarioEnUso[2]})
    next()
})

router.get("/procesos", (req, res, next) =>{
    
    res.render("procesos.pug",{
        h1 : var_const.usuarioEnUso[0], 
        accesos: var_const.usuarioEnUso[2],
        procesos : js.listadoProcesos(var_const.procesos)
    })
    
    next()
})

router.post("/new-entry", (req, res, next)=>{   
    
    var boton = req.body.boton
    if(boton == "olvidar"){
        res.render("index.pug", {olvidar : js.mostrar()})
    }else{
        var validacion = js.validacion(req.body, var_const.usuarios);
        if(validacion == true){
            res.render("home.pug", {h1 : req.body.nombre, accesos: var_const.usuarioEnUso[2]})
        }
        else{
            res.render("index.pug", {mostrar : js.mostrar()})
        }

        usuario.push(js.nombre(req.body));
        usuario.push(js.accesos(req.body, var_const.usuarios))
     
        return usuario
    }
    next()
    
})


//Rutas de ADP
router.post("/adp", upload.single('archivo'), (req, res, next)=>{   
    
    var boton = req.body.boton  
    if(boton == "recibos"){
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            recibos : js.mostrar(),
            procesos : js.listadoProcesos(var_const.procesos)
        })
    }

    //Registrar Recibos
    if(boton == "cargar"){
        const {legajo, mes, ano, archivo} = req.body;
        if(legajo =="" || mes=="" || ano=="" || archivo==""){
            res.render("procesos.pug", {
                h1 : var_const.usuarioEnUso[0], 
                accesos: var_const.usuarioEnUso[2], 
                completar : js.mostrar(),
                procesos : js.listadoProcesos(var_const.procesos)
            })
        }
        
        var recibosJson = fs.readFileSync("archivos/bases/recibos.json", "utf-8");
        var recibos = JSON.parse(recibosJson)
        var newRecibo = {
            legajo,
            mes,
            ano,
            archivo
        }
        newRecibo.autor = var_const.usuarioEnUso[1]
        var base64String = fs.readFileSync('./uploads/recibos/archivo-.pdf', {encoding: "base64"})
        newRecibo.archivo = base64String
        recibos.push(newRecibo)
        var jsonRecibo = JSON.stringify(recibos);

        fs.writeFileSync("archivos/bases/recibos.json", jsonRecibo, "utf-8");
        
        console.log(recibos)
        
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            recibos : js.mostrar(),
            procesos : js.listadoProcesos(var_const.procesos)
        })    
    }
    
    //Cruce de Novedades
    if(boton == "cruce_novedades"){
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            cruce : js.mostrar(),
            procesos : js.listadoProcesos(var_const.procesos)
        })
    }


    if(boton == "vacaciones"){
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            masivas : js.mostrar(),
            procesos : js.listadoProcesos(var_const.procesos)
        })       
    }
    
    next()
    
})

//Rutas de Administrador
router.post("/administrador", upload.single('archivo'), (req, res, next)=>{
    var boton = req.body.boton 
    if(boton == "descargas"){
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            descargas : js.mostrar(), 
            procesos : js.listadoProcesos(var_const.procesos)
        })
    }
    if(boton == "procesos"){
        res.render("procesosEspecificos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            descargas : js.mostrar(), 
            procesos : js.listadoProcesos(var_const.procesos)
        })

    }

    else if(boton == "crear_usuario"){ 
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            crear_usuario : js.mostrar(),
            procesos : js.listadoProcesos(var_const.procesos)
        })
    }
})






module.exports = router
