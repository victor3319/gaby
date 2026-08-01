const fs = require("fs");
const path = require("path");

    //CONSTANTES

    //Procesos
    const baseProceso = fs.readFileSync("./archivos/bases/procesos.json", "utf-8");
    const procesos = JSON.parse(baseProceso)

   
module.exports = {
    procesos : procesos
}