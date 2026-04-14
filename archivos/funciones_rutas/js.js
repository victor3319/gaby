const var_const = require("./var_const")
const fs = require("fs")
const pdf = require("pdf-parse-new");

//VALIDACION DE USUARIOS
function validacion(datos, usuarios){
    var nombres = []
    var correos = []
    var passwords = []
    var datosNombre = datos.nombre
    var datosCorreo = datos.correo
    var datosPassword = datos.password

    usuarios.map((item) => nombres.push(item.nombre))
    usuarios.map((item) => correos.push(item.correo))
    usuarios.map((item) => passwords.push(item.password))
    

    var valNombre = nombres.includes(datosNombre)
    var valCorreo = correos.includes(datosCorreo)
    var valPassword = passwords.includes(datosPassword)


//Validación de usuario y crear usuario en uso    
    if(valNombre == true && valCorreo == true && valPassword == true){
        var usuarios = var_const.usuarios
        var usuarioEnUso = []
        usuarioEnUso.push(datosNombre)
        usuarioEnUso.push(datosCorreo)
        var accesos = usuarios.find(prop => prop.correo == datosCorreo)
        usuarioEnUso.push(Object.keys(accesos.accesos[0]))
        
        var jsonUsuarioEnUso = JSON.stringify(usuarioEnUso);
        
        fs.writeFile("./archivos/bases/usuarioEnUso.json", jsonUsuarioEnUso, (error)=>{
                    if(error)throw error;
                    console.log("Informacion Recibida");
                })

        return true
        
    }else{
        return false
    }
}

//MOSTRAR VENTANA MODAL

function mostrar(){
    var mostrar = ""
    mostrar = "open"
    return mostrar
}

//COVERTIR BASE64

function base64(){
    var base64String = fs.readFileSync('./uploads/recibos/archivo-.pdf', {encoding: "base64"})
    return base64String
}

//EXTRAER TEXTO PDF



function textoPdf(){
    
    const dataBuffer = fs.readFileSync('./uploads/recibos/archivo-.pdf');
    var letras = pdf(dataBuffer).then((datos)=> letras = datos.text)
    
    return letras
        
    // Número de páginas console.log ( datos.text ) ; // Contenido de texto completo console.log ( datos.info ) ; // Metadatos del PDF } ) ;)})
    
    }


//CAMBIO DE CONTRASEÑA
function cambioPassword(datos, usuarios){
    var nombres = []
    var correos = []
    //var passwords = []
    var datosNombre = datos.nombreC
    var datosCorreo = datos.correoC
    var datosPassword = datos.passwordC

    usuarios.map((item) => nombres.push(item.nombre))
    usuarios.map((item) => correos.push(item.correo))
    //usuarios.map((item) => passwords.push(item.password))
    

    var valNombre = nombres.includes(datosNombre)
    var valCorreo = correos.includes(datosCorreo)
    //var valPassword = passwords.includes(datosPassword)

    if(valNombre == true && valCorreo == true /*&& valPassword == true*/){
        return true
        
    }else{
        return false
    }
}

//LISTADO SECUNDARIO
function listadoSecundario(base, dato){
    var datos = base[0]
    var lista = []
    for(const elemento in datos){
        lista.push(Object.values(datos))
    };
    console.log(datos)
    console.log(lista)
    return dato
    
}

//EXTERNO
function pdfA(archivo){
    if(archivo == undefined){
        return false
    }else{
        var nomArchivo = archivo.originalname
        var extArchivo = String(nomArchivo).split(".").pop()
        
        if(extArchivo != "pdf"){
            return false
        }
    }
}

function registro(datos,base){
    for( var i= 0; i < base.length; i++){
        if(datos.email == base[i].email){
            return false
        }    
    }
}

async function solicitud(datos, archivo, solicitudes){
    delete datos.boton
    var base = await base64()
    var texto = await textoPdf()    
    console.log(texto)
}



module.exports = {
    validacion : validacion,
    mostrar : mostrar,
    cambioPassword : cambioPassword,
    listadoSecundario : listadoSecundario,
    textoPdf : textoPdf,
    base64 : base64,
    pdfA : pdfA,
    registro : registro,
    solicitud : solicitud
}

