const var_const = require("./var_const")
const fs = require("fs")

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
        usuarioEnUso.push(accesos.accesos)
        
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
function listadoSecundario(procesos, dato){
    var procesos = procesos[0]
    var dato = dato
    var listaSecundaria = procesos[dato]
    console.log(listaSecundaria)
    return listaSecundaria
    
}



module.exports = {
    validacion : validacion,
    mostrar : mostrar,
    cambioPassword : cambioPassword,
    listadoSecundario : listadoSecundario
}

