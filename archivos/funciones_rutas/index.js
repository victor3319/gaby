const {Router} = require("express");
const router = Router();
const fs = require("fs");
const var_const = require("./var_const");
const js = require("./js");
const path = require ("path");
const multer = require("multer");
const pdf = require("pdf-parse-new");

//MODELOS IMPORTADOS
const usuarioEnUsoDB = require("../modelos/usuarioEnUso");
const usuariosDB = require("../modelos/usuarios");
const solicitudesEmpleoDB = require("../modelos/solicitudesEmpleo")
const console = require("console");

//leer pdf
/*const dataBuffer = fs.readFileSync('./uploads/recibos/archivo-.pdf');
pdf(dataBuffer).then(function(datos){
    console.log(datos.text)
})
// Número de páginas console.log ( datos.text ) ; // Contenido de texto completo console.log ( datos.info ) ; // Metadatos del PDF } ) ;)})
*/

var usuarioNavegacion = ""

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
    usuarioNavegacion = ""
    res.render("index.pug")
    next()
    usuario = []
    return usuario
})

router.get("/home", async(req, res, next) =>{
    console.log(usuarioNavegacion)
    res.render("home.pug",{
        h1 : usuarioNavegacion.nombre,
        accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
    })
    next()
})

router.get("/procesos", async(req, res, next) =>{
    const usuarioEnUso = await usuarioEnUsoDB.find()
    var proceso = req.body.proceso
    res.render("procesos.pug",{
        h1 : usuarioNavegacion.nombre, 
        accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1)
    })
    
    next()
})

router.post("/new-entry", async (req, res, next)=>{   
    const usuarios = await usuariosDB.find()
    const usuarioEnUso = await usuarioEnUsoDB.find()
    
    var datos = req.body
    var boton = req.body.boton
    
    if(boton == "olvidar"){
        res.render("index.pug", {olvidar : js.mostrar()})
    }else{
        var validacion = js.validacionUsuario(datos, usuarios);
        if(validacion[0] == true){
            var usuariobase = (usuarios.filter(usuario => usuario.correo === validacion[2]))[0]
            usuarioNavegacion = usuariobase.toObject()

            res.render("home.pug", {
                h1 : usuarioNavegacion.nombre, 
                accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            })
        }
        else{
            res.render("index.pug", {mostrar : js.mostrar()})
        }       
    }
    next()
})


//RUTAS ADP
router.post("/adp", upload.single('archivo'), (req, res, next)=>{   
    var boton = req.body.boton  
    if(boton == "recibos" || boton == "cerrarR"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: "recibos"
        })
    }
    if(boton == "cargarRecibos"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: boton,
            recibos : js.mostrar()
        })
    }

    //Registrar Recibos
    if(boton == "cargar"){
        const {legajo, mes, ano, archivo} = req.body;
        if(legajo =="" || mes=="" || ano=="" || archivo==""){
            res.render("procesosEspecificos.pug", {
                h1 : usuarioNavegacion.nombre, 
                accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
                proceso: boton, 
                completar : js.mostrar()
            })
        }else{            
                res.render("procesosEspecificos.pug", {
                    h1 : usuarioNavegacion.nombre, 
                    accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
                    proceso: boton
                })    
        
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
                
            }   
    }
    
    //Cruce de Novedades
    if(boton == "novedades" || boton == "cerrarN"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: boton
        })
    }
    if(boton == "cruce"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: boton,
            cruce : js.mostrar() 
        })
    }

    /*if(boton == "vacaciones"){
        res.render("procesos.pug", {
            h1 : var_const.usuarioEnUso[0], 
            accesos: var_const.usuarioEnUso[2], 
            masivas : js.mostrar()
        })       
    }*/
    
    next()
    
})

//RUTAS EXTERNAS
router.post("/externo", upload.single('archivo'), async(req, res, next)=>{
    var boton = req.body.boton
    var datos = req.body
    var cv = req.file
    var solicitudesEmpleo = await solicitudesEmpleoDB.find()
    
    
    //SOLICITUD DE EMPLEO
    if(boton == "solicitud" || boton == "cerrar"){
        res.render("procesosExternos.pug", {
            proceso: "solicitud"
        })
    }

    if(boton == "postular"){
        const {nombres, apellidos, telefono, email, carrera, sueldo, archivo} = req.body;
        //VALIDADION DE DATOS OBLIGATORIOS
        if(
            nombres =="" || 
            apellidos =="" || 
            telefono =="" || 
            email =="" || 
            carrera =="" || 
            sueldo =="" || 
            archivo ==""){
            res.render("procesosExternos.pug", {
                proceso: "solicitud",
                completar: js.mostrar()
            })  
        }
        //VALIDACION DE ARCHIVO PDF
        if(js.pdfA(cv)== false || cv ==undefined){
            res.render("procesosExternos.pug", {
                proceso: "solicitud",
                pdf: js.mostrar()
            })  
        }
        // VALIDACIONN DE REGISTRO
        if(js.validarRegistro(datos, solicitudesEmpleo)== true){
            res.render("procesosExternos.pug", {
                proceso: "solicitud",
                registro: js.mostrar()
            })
        // REGISTRAR SOLICITUD  
        }else if(nombres !="" && apellidos !="" && telefono !="" && email !="" && carrera !="" && sueldo !="" && archivo !=""){
            var nuevaSolicitud = await js.solicitud(datos)
            await solicitudesEmpleoDB.create(nuevaSolicitud);
            console.log(nuevaSolicitud)
            res.render("procesosExternos.pug", {
                proceso: "solicitud",
                //ejecucion: js.solicitud(datos, ruta),
                exito: js.mostrar()
            })  
        }
        
    }



    //FICHADA
    if(boton == "fichaje"){
        res.render("procesosExternos.pug", {
            proceso: boton
        })
    }


})


//RUTAS EMPLEO Y DESARROLLO
router.post("/e&d", upload.single('archivo'), async(req, res, next)=>{   
    var boton = req.body.boton
    var solicitudesEmpleo = await solicitudesEmpleoDB.find()
    var rutaSolicitudes = var_const.rutaSolicitudes
    
    if(boton == "seleccion" || boton == "cerrarS"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: "seleccion",
            base1 : solicitudesEmpleo
        })
    }

//TABLA DE SOLICITUDES
var datosBoton = req.body.boton.split("-")
var boton = datosBoton[0]
var registro = datosBoton[1]
if(boton == "solicitudes"){
    var base = solicitudesEmpleo
    //var base = js.accionTabla(datosBoton, var_const.rutaSolicitudes, var_const.objetoSolicitudes)
    res.render("procesosEspecificos.pug",{
        h1 : usuarioNavegacion.nombre, 
        accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
        proceso: "seleccion",
        solicitudes : js.mostrarOcultarContenido(),
        base1 : base
        })
    }else if(boton == "eliminar"){
        var base = solicitudesEmpleo
        console.log(datosBoton)
        await solicitudesEmpleoDB.deleteOne({correo: registro});
        var borrado = await solicitudesEmpleoDB.find()
        //var base = js.accionTabla(datosBoton, var_const.rutaSolicitudes, var_const.objetoSolicitudes)
    res.render("procesosEspecificos.pug",{
        h1 : usuarioNavegacion.nombre, 
        accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
        proceso: "seleccion",
        solicitudes : js.mostrarOcultarContenido(),
        base1 : borrado
        })
}else if(boton == "cv"){
    res.setHeader('Content-Type', 'application/pdf');
    res.send(js.mostrarArchivo(datosBoton[1], solicitudesEmpleo))
}else if(boton == "fCv"){
    var base = js.filtrarTabla(req.body.filtrocv, solicitudesEmpleo)
    console.log(base)
    res.render("procesosEspecificos.pug", {
        h1 : usuarioNavegacion.nombre, 
        accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
        proceso: "seleccion",
        solicitudes : js.mostrarOcultarContenido(),
        base1 : base
        })

}


//TABLA BUSQUEDAS
    if(boton == "busquedas" || boton == "cerrarS"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: "seleccion",
            busquedas : js.mostrarOcultarContenido(),
            base1 : var_const.objetoSolicitudes
        })
    }
//TABLA POSTULACIONES
    if(boton == "postulados" || boton == "cerrarS"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: "seleccion",
            postulados : js.mostrarOcultarContenido(),
            base1 : var_const.objetoSolicitudes
        })
    }
     next()
})

//RUTAS DE ADMINISTRADOR
router.post("/administrador", upload.single('archivo'), (req, res, next)=>{
    var boton = req.body.boton
    var proceso = req.body.proceso
    var subProceso = req.body.subProceso
    if(boton == "descargas"){
        res.render("procesos.pug",{
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            subProcesos : js.listadoSecundario(var_const.procesos, proceso), 
            descargas : js.mostrar()
        })
    }
    if(boton == "procesos" && proceso == "accesos"){
        res.render("procesos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            subProcesos : js.listadoSecundario(var_const.procesos, proceso), 
            completar : js.mostrar()
        })
    }

    if(boton == "procesos" && proceso != "accesos"){
        res.render("procesos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            subProcesos : js.listadoSecundario(var_const.procesos, proceso),
            descargas2 : js.mostrar()
        })
    }

    if(boton == "subProcesos" && subProceso == "subProcesos"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            subProcesos : js.listadoSecundario(var_const.procesos, proceso)
        })
    }
})

//RUTA VOLVER DE PROCESOS ESPECIFICOS
router.post("/procesosEspecificos", upload.single('archivo'), (req, res, next)=>{
    var boton = req.body.boton
    if(boton == "cargarRecibos"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: boton
            //recibos : js.mostrar()
        })
    }

    if(boton == "novedades"){
        res.render("procesosEspecificos.pug", {
            h1 : usuarioNavegacion.nombre, 
            accesos: Object.keys(usuarioNavegacion.accesos[0]).splice(1),
            proceso: boton 
            //cruce : js.mostrar()
        })
    }
})





module.exports = router
