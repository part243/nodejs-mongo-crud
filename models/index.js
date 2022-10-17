const dbConfig = require("../db/db.config.js"); //cargar configuracion de bdd
const mongoose = require('mongoose'); //importa modulo mongo
mongoose.Promise = global.Promise; // declarams las pomesas
const db = {}; //declarar variable db
db.mongoose = mongoose; //asignar la instancia mongoose a db.mongo variable
db.url = dbConfig.url; //asignar url para conectar
db.DatosPersonalesSchema = require('./datospersonales.model.js')(mongoose); //ejecutatr model con la configuracion creada
module.exports = db; //EXPORTAR VARIABLE