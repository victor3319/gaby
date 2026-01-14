const fs = require("fs");
const path = require("path");  
    
    //CONSTANTES

    //Base de Usuarios
    const bUsuarios = fs.readFileSync("archivos/bases/usuarios.json", "utf-8");
    const usuarios = JSON.parse(bUsuarios);
    
    /*//Base de recibos
    const bRecibos = fs.readFileSync("archivos/bases/recibos.json", "utf-8");
    const recibos = JSON.parse(bRecibos)*/
    
    //Datos de Usuario en uso
    const bUsuarioEnUso = fs.readFileSync("archivos/bases/UsuarioEnUso.json", "utf-8");
    const usuarioEnUso = JSON.parse(bUsuarioEnUso);

    //Procesos
    const baseProceso = fs.readFileSync("archivos/bases/procesos.json", "utf-8");
    const procesos = JSON.parse(baseProceso)

module.exports = {
    usuarios : usuarios,
    //recibos : recibos,
    usuarioEnUso : usuarioEnUso,
    procesos : procesos
}